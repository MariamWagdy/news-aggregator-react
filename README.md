# 📰 News Aggregator React

A **Dockerized React.js + TypeScript** project for a news aggregator website. This setup ensures **smooth development and deployment**, making it easy for anyone to clone and run the project with **Docker**.

---

## 🚀 Features
- Built with **React.js + TypeScript** (latest stable versions)
- Fully **Dockerized** (works the same locally and in containers)
- Supports **Node.js v16.20.2** and **NPM v8.19.4**
- Uses **ESLint** for code quality
- Includes **hot reloading** for fast development
- Type-safe development using **TypeScript**

---

## 📌 Prerequisites
Ensure you have the following installed:

- **Docker & Docker Compose** ([Install Guide](https://docs.docker.com/get-docker/))
- **Git** ([Install Guide](https://git-scm.com/downloads))
- (Optional) **Node.js v16.20.2 & NPM v8.19.4** (for running locally)

---

## 🔧 Setup Instructions

### ✅ Clone the Repository
```sh
git clone git@github.com:MariamWagdy/news-aggregator-react.git
cd news-aggregator-react
```

### 🐳 Run with Docker (Recommended)
```sh
docker-compose up -d --build
```
📌 **Now visit:** `http://localhost:3000`

### 🏗️ Run Locally (Without Docker)
```sh
npm install
npm start
```
📌 **Now visit:** `http://localhost:3000`

---

## 📂 Project Structure
```plaintext
news-aggregator-react/
├── src/               # React + TypeScript source code
├── public/            # Static assets
├── Dockerfile         # Docker setup
├── docker-compose.yml # Docker Compose configuration
├── package.json       # Dependencies & scripts
├── tsconfig.json      # TypeScript configuration
├── .gitignore         # Files to exclude from Git
├── README.md          # Project documentation
```

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 🙌 Contributions
Contributions are welcome! Feel free to submit issues and pull requests.

---

## 📞 Contact
For questions or support, reach out via **GitHub Issues** or **Email: mariam.wagdy92@gmail.com**.

🚀 **Happy Coding!** 🎉

