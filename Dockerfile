FROM node:18.15.0
WORKDIR C:\Users\jerem\Desktop\ProjetoIndividual\backend\api
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]