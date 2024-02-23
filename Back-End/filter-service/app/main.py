from controller.filter_controller import router
from dotenv import load_dotenv
from fastapi import FastAPI

load_dotenv()
app = FastAPI()
app.include_router(router)
