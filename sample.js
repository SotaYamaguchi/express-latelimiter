const express = require("express");
const Queue = require("bull");
const { TokenBucket } = require("limiter");

// トークンバケットによるレートリミッターを設定
const bucket = new TokenBucket({
  bucketSize: 2, // トークンの最大数
  tokensPerInterval: 1, // 1分間に生成されるトークン数
  interval: "minute", // トークン生成の間隔
});

const someProcess = () => {
  const currentTime = new Date().toLocaleString();
  console.log(`Processing at: ${currentTime}`);
};

// キューの作成
const myQueue = new Queue("myQueue");

// キューにジョブを追加する関数
function addJobToQueue(data) {
  myQueue.add(data);
}

// キューでのジョブの処理
myQueue.process(async function(job, done) {
  console.log("Processing job");
  await bucket.removeTokens(1);
  someProcess();
  done();
});

// Expressサーバーの設定
const app = express();
app.use(express.json());

// ルートエンドポイントでジョブをキューに追加
app.post("/job", (req, res) => {
  addJobToQueue(req.body);
  res.send("Job added to queue");
});

// サーバーの起動
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
