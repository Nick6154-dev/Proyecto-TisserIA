from fastapi import APIRouter, UploadFile, File
from service.filter_service import CrochetDetector
from PIL import Image
import base64
import io

router = APIRouter(prefix="/filterService", tags=["filter"])
crochet = CrochetDetector()


@router.post("/processImage")
async def is_a_crochet_image(image: UploadFile = File(...)):
    image_data = await image.read()
    image = Image.open(io.BytesIO(image_data))
    buffered = io.BytesIO()
    image.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue()).decode()
    return crochet.is_a_crochet(img_str)
