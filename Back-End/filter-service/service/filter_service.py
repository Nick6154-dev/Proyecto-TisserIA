from transformers import AutoProcessor, BlipForConditionalGeneration, AutoTokenizer
from model.response_model import ResponseModel
from openai import OpenAI
from PIL import Image
from io import BytesIO
import requests
import base64
import torch
import os


class CrochetDetector:

    def __init__(self):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.api_key = os.getenv('OPEN_AI_API_KEY', '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')
        self.client = OpenAI(api_key=self.api_key)
        self.model = BlipForConditionalGeneration.from_pretrained(os.getenv('MODEL_IMAGE_PATTERN_PATH', './blip-image-captioning-large-crochet-pattern-finetuned-3'))
        self.processor = AutoProcessor.from_pretrained(os.getenv('MODEL_IMAGE_PATTERN_PATH', './blip-image-captioning-large-crochet-pattern-finetuned-3'))
        self.model.to(self.device)

    def is_a_crochet(self, base64_image):
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }
        payload = {
            "model": "gpt-4-vision-preview",
            "messages": [
                {
                    "role": "assistant",
                    "content": [
                        {
                            "type": "text",
                            "text": "Lo que aparece en la imagen es algo tejido a crochet?, contestame solamente con true o false"
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            }
                        }
                    ]
                }
            ]
        }
        response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
        response_dict = response.json()
        is_crochet = response_dict['choices'][0]['message']['content'].strip().lower() == 'true'
        if is_crochet:
            return ResponseModel(is_crochet=is_crochet, message=self.get_pattern(base64_image))
        else:
            return ResponseModel(is_crochet=is_crochet, message="No se puede extraer el patron.")

    def get_pattern(self, base64_image):
        image_bytes = base64.b64decode(base64_image)
        image = Image.open(BytesIO(image_bytes)).convert("RGB").resize((224, 224))
        inputs = self.processor(images=image, return_tensors="pt").to(self.device)
        pixel_values = inputs.pixel_values
        generated_ids = self.model.generate(pixel_values=pixel_values, max_length=65)
        generated_caption = self.processor.batch_decode(generated_ids, skip_special_tokens=True)[0]
        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "assistant", "content": "Al siguiente texto traducelo al espanol, quita los agradecimientos, quita urls externas, quita sugerencias y agrega los patrones para le prenda crochet: " + generated_caption}
            ],
            temperature=0.1
        )
        return response.choices[0].message.content + "..."
