# 🌐 AIRSDS - Guesthouse Web Application (Frontend)

![React](https://img.shields.io/badge/React-18.0.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-frontend-yellow?logo=vite)
![SpringBoot](https://img.shields.io/badge/SpringBoot-3.x-green?logo=springboot)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?logo=mysql)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

> **AIRSDS** is a next-generation guesthouse booking platform inspired by Airbnb,  
> built with **modern frontend technologies** and connected to a robust Spring Boot backend.

---

## 📖 프로젝트 소개

**AIRSDS**는 Airbnb와 유사한 **게스트하우스 예약 서비스**를 구현했습니다.  

이 레포지토리는 **프론트엔드 전용 저장소**이며,  
빠른 빌드와 개발 경험을 위해 **Vite + React + TypeScript** 스택을 사용하였습니다.  

사용자는 직관적인 UI를 통해:
- 숙소 탐색
- 숙소 상세 정보 확인
- 예약 진행  

등의 기능을 손쉽게 이용할 수 있습니다.  

---

## 👥 팀 구성 및 역할 분담

| 이름 | 역할 |
|------|------|
| **황규민** | 메인 페이지 구현 |
| **한상안** | 예약 페이지 구현 |
| **김예랑** | 상세 페이지 구현 |

---

## 🛠️ 기술 스택

### Frontend
- **Framework**: [React](https://react.dev/) (with Hooks & Component-based architecture)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Bundler/Dev tool**: [Vite](https://vitejs.dev/)  
- **Styling**: TailwindCSS (optional)  

### Backend
- **Framework**: [Spring Boot 3.x](https://spring.io/projects/spring-boot)
- **Language**: Java
- **ORM**: JPA (Java Persistence API)
- **Database**: MySQL

---

## ✨ 주요 기능

🔍 숙소 탐색 (Search & Filter)
사용자가 원하는 지역, 날짜, 가격대 조건으로 숙소 검색 가능

🏠 숙소 상세 정보 (Detail Page)
사진, 설명, 가격, 위치 정보 제공

📅 예약 기능 (Booking)
사용자가 원하는 날짜로 예약 가능

📊 데이터 관리
Spring Boot + JPA 기반으로 안정적 데이터 연동

---
## 🚀 실행 방법
### 1. Clone Repository
```
git clone https://github.com/mightykyumin/airsds_ts.git
cd airsds_ts
```

### 2. Install Dependencies
```
npm install
```

### 3. Run Dev Server
```
npm run dev
```
