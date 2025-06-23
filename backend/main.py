# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pymysql
from pydantic import BaseModel
from typing import Optional

# FastAPI app 初始化
app = FastAPI()

# 允许小程序跨域访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 生产环境时需要替换成具体域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 连接数据库的函数
def get_user_data():
    # 连接到数据库
    conn = pymysql.connect(
        host='127.0.0.1',
        user='root',
        password='',  # 密码如果有要填上
        database='beauty_app',
        unix_socket='/tmp/mysql.sock'
    )
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute("SELECT * FROM user_profile LIMIT 1;")
    result = cursor.fetchone()
    conn.close()
    return result

# 定义数据模型
class UserProfile(BaseModel):
    userName: str
    avatarUrl: str
    beautyScore: int
    lastUpdated: str

@app.get("/user-profile", response_model=UserProfile)
def user_profile():
    data = get_user_data()
    return data
