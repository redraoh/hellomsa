import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import database as sess
from api.routes import product
from api.routes import naver

app = FastAPI()

# CORS 설정
origins = [
    "http://localhost:3000",  # 허용할 프론트엔드 도메인
    "http://43.203.121.72:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    #allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product.router)
app.include_router(naver.router)


if __name__ == '__main__':
    sess.create_tables()
    uvicorn.run('main:app', port=8000, reload=True)
