# 🚀 SavdoX Loyihasini Contabo VPS-ga Docker Orqali Joylash Yo'riqnomasi

Ushbu yo'riqnoma orqali SavdoX loyihasini (React Frontend + Node.js Backend + PostgreSQL Database) Contabo VPS serveringizda Docker containerlari yordamida muvaffaqiyatli ishga tushirishingiz mumkin.

---

## 📋 1-Qadam: Contabo VPS-ga Docker va Docker Compose O'rnatish

Contabo VPS (Ubuntu 22.04 / 24.04 LTS) serveringizga SSH orqali kiring va Docker-ni o'rnating:

```bash
# Server paketlarini yangilash
sudo apt update && sudo apt upgrade -y

# Docker va Kerakli paketlarni o'rnatish
sudo apt install -y ca-certificates curl gnupg lsb-release

# Docker rasmiy kalitini qo'shish
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Docker omborini qo'shish
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Docker va Docker Compose Plugin o'rnatish
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Docker xizmatini yoqish va tekshirish
sudo systemctl enable docker
sudo systemctl start docker
docker --version
docker compose version
```

---

## 📥 2-Qadam: Loyihani Serverga Yuklash (Git)

VPS-da ishchi papkaga o'ting va GitHub-dan loyihani klonlang:

```bash
cd /var/www || cd ~
git clone https://github.com/AsilbekTurkmanov/SavdoX.git
cd SavdoX
```

---

## 🐳 3-Qadam: Docker Container-larni Ishga Tushirish

Loyihani birinchi marta yig'ish va fonda ishga tushirish uchun:

```bash
docker compose up -d --build
```

Bu buyruq quyidagilarni bajaradi:
1. **PostgreSQL 16** konteynerini yaratadi va sozlaydi (`savdox_postgres`).
2. **SavdoX App** konteynerini yig'adi (`Dockerfile` orqali frontend build olinadi va Express backend ishga tushadi).
3. Portlarni bog'laydi (HTTP `80` port serveringiz IP manzilida ochiladi).

### Holatni va loglarni tekshirish:

```bash
# Konteynerlar holatini tekshirish
docker compose ps

# Ishlash loglarini ko'rish
docker compose logs -f app
```

Endi brauzeringizda Contabo serveringiz IP manzilini kiriting (masalan: `http://YOUR_SERVER_IP`). Loyihangiz to'liq ishlaydi!

---

## 🔒 4-Qadam: SSL Domen (HTTPS) va Certbot Sozlash (Ixtiyoriy)

Agar shaxsiy domeningiz bo'lsa (masalan: `savdox.uz`), Nginx va Let's Encrypt SSL sertifikatini o'rnatishingiz mumkin:

```bash
# Nginx va Certbot o'rnatish
sudo apt install -y nginx certbot python3-certbot-nginx

# Nginx konfiguratsiya faylini yaratish
sudo nano /etc/nginx/sites-available/savdox
```

Quyidagi konfiguratsiyani qo'ying (`savdox.uz` o'rniga o'z domeningizni yozing):

```nginx
server {
    server_name savdox.uz www.savdox.uz;

    location / {
        proxy_pass http://localhost:80;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Konfiguratsiyani saqlang va Nginx-ni qayta yoqing:

```bash
sudo ln -s /etc/nginx/sites-available/savdox /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Bepul SSL sertifikat olish
sudo certbot --nginx -d savdox.uz -d www.savdox.uz
```

---

## 🛠 Boshqaruv Buyruqlari Cheat Sheet

| Vazifa | Buyruq |
|---|---|
| Konteynerlarni qayta yig'ish va ishga tushirish | `docker compose up -d --build` |
| Konteynerlarni to'xtatish | `docker compose down` |
| Barcha loglarni ko'rish | `docker compose logs -f` |
| Faqat Node app logini ko'rish | `docker compose logs -f app` |
| PostgreSQL logini ko'rish | `docker compose logs -f postgres` |
| PostgreSQL bazasiga kirish | `docker exec -it savdox_postgres psql -U postgres -d savdox_db` |
