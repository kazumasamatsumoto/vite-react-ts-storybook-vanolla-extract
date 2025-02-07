# Dockerfile

# Node.js 22 をベースにする
FROM node:22

# 作業ディレクトリを /app に設定
WORKDIR /app

# package.json と package-lock.json（または yarn.lock）をコピーして依存関係のインストール
COPY package*.json ./
RUN npm install

# 全ソースコードをコピー（ホットリロード用に docker-compose でボリュームマウントするため、ここでのコピーはビルド時の初期状態として）
COPY . .

# Storybook のポート（6006）を公開
EXPOSE 6006

# コンテナ起動時に Storybook を開発モードで起動
CMD ["npm", "run", "storybook"]
