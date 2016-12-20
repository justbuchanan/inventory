FROM justbuchanan/docker-archlinux

RUN pacman -Syu --noconfirm
RUN pacman -S --noconfirm nodejs npm

RUN mkdir inventory
WORKDIR inventory

COPY package.json ./
RUN npm install

COPY index.html app server.js tsconfig.json systemjs.config.js ./

EXPOSE 3000
CMD ["npm", "start"]
