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
    conn = pymysql.connect(	
        host='127.0.0.1',
        user='root',
        password='',  	
        database='beauty_app',
        unix_socket='/tmp/mysql.sock'
    )	  	
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute("SELECT * FROM user_profile LIMIT 1;")
    result = cursor.fetchone()	#fetchone()是获取数据库查询结果中的“第一行”记录，还有fetchall()，fetchmany(n)
    conn.close()
    return result

# 定义数据模型
class UserProfile(BaseModel):
    userName: str
    avatarUrl: str
    beautyScore: int
    lastUpdated: str

@app.get("/user-profile", response_model=UserProfile)
def user_profile():	#每次run后端的时候，这个user_profile函数会自动run，但是必须写在app.get的下方
    data = get_user_data()
    return data


from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import pymysql

# 初始化 FastAPI 应用
app = FastAPI()

# 允许小程序跨域访问（开发阶段可用 *，生产环境建议换成指定域名）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 数据库连接配置
DB_CONFIG = {
    "host": "127.0.0.1",
    "user": "root",
    "password": "",  # 如果有密码请填写
    "database": "beauty_app",
    "unix_socket": "/tmp/mysql.sock",		
    "cursorclass": pymysql.cursors.DictCursor      
}

# Pydantic 数据模型 - 返回用
class UserProfile(BaseModel):
    userName: str
    avatarUrl: str
    beautyScore: int
    lastUpdated: str

# Pydantic 数据模型 - 用户提交用
class UserProfileInput(BaseModel):
    userName: str
    avatarUrl: str
    beautyScore: int

# 查询用户数据（取最新一条）
def get_user_data():
    try:
        with pymysql.connect(**DB_CONFIG) as conn:	#表示python mysql连接
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM user_profile ORDER BY lastUpdated DESC LIMIT 1;")
                result = cursor.fetchone()	
                return result			  
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

# 插入用户数据
def insert_user_profile(user: UserProfileInput):
    try:
        with pymysql.connect(**DB_CONFIG) as conn:
            with conn.cursor() as cursor:
                sql = """
                    INSERT INTO user_profile (userName, avatarUrl, beautyScore, lastUpdated)
                    VALUES (%s, %s, %s, NOW())
                """
                cursor.execute(sql, (user.userName, user.avatarUrl, user.beautyScore))
            conn.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Insert failed: {str(e)}")

# 首页健康检查接口
@app.get("/")
def health_check():
    return {"status": "API is running"}

# 获取最新用户资料
@app.get("/user-profile", response_model=UserProfile)
def user_profile():	#每次run后端的时候，这个user_profile函数会自动run，但是必须写在app.get的下方
    data = get_user_data()
    if data:
        return data
    raise HTTPException(status_code=404, detail="No user profile found")

# 提交新的用户资料
@app.post("/submit-profile")
def submit_profile(user: UserProfileInput):
    insert_user_profile(user)
    return {"message": "User profile saved successfully"}
    