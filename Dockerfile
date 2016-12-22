FROM justbuchanan/docker-archlinux

RUN pacman -Syu --noconfirm
RUN pacman -S --noconfirm nodejs npm
RUN npm install -g angular-cli

RUN pacman -S --noconfirm go git
ENV GOPATH $HOME/go

RUN mkdir inventory
WORKDIR inventory

COPY package.json ./
RUN npm install

COPY backend ./backend
RUN go get github.com/gorilla/mux

# copy frontend files and compile, resulting in a statically-servable "dist" directory
COPY protractor.conf.js tslint.json karma.conf.js angular-cli.json ./
COPY src ./src
RUN ls
# TODO: fix ng build
RUN ng build || true

EXPOSE 3000
# CMD ["npm", "start"]
EXPOSE 8080
CMD ["go", "run", "backend/main.go"]
