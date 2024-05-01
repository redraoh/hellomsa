import sqlalchemy
from sqlalchemy.orm import sessionmaker
import os

from api.models.product import Base

db_path = os.path.join(os.path.dirname(__file__), 'products.db')
db_url = f'sqlite:///{db_path}'

#db_url = 'sqlite:///products.db'

engine = sqlalchemy.create_engine(db_url, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def create_tables():
    Base.metadata.create_all(engine)

# 데이터베이스 세션 의존성 생성
# def get_db():
#     db = sess.SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()
# 새버전
def get_db():
    with SessionLocal() as db:
        yield db