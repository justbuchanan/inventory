FROM justbuchanan/docker-archlinux

RUN pacman -Syu --noconfirm
RUN pacman -S --noconfirm nodejs npm gcc
RUN npm install -g angular-cli
RUN ng version

RUN pacman -S --noconfirm go git
ENV GOPATH $HOME/go
RUN go get github.com/gorilla/mux github.com/jinzhu/gorm github.com/jinzhu/gorm/dialects/sqlite

RUN mkdir inventory
WORKDIR inventory

COPY package.json ./
RUN npm install

COPY backend ./backend

# copy frontend files and compile, resulting in a statically-servable "dist" directory
COPY protractor.conf.js tslint.json karma.conf.js angular-cli.json ./
COPY src ./src
# TODO: fix ng build
RUN ng build || true

VOLUME "/data"
EXPOSE 8080
CMD ["go", "run", "backend/main.go", "--dbpath", "/data/parts.sqlite3db"]
