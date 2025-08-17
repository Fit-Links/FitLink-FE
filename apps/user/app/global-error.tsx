"use client";

export default function GlobalError() {
  return (
    <html lang="ko">
      <head>
        <title>Fit-Link Error</title>
        <style>
          {`
          body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            width: 100vw;
            text-align: center;
            background-color: hsl(0 0% 11%);
          }
          .title {
            color: hsl(241 100 67);
            font-size: 1.2rem;
            font-weight: 700;
          }
          .description {
            color: hsl(0 0% 75%);
            margin: 0.5rem;
          }
          `}
        </style>
      </head>
      <body>
        <main>
          <p className="title">서비스에 문제가 발생했어요</p>
          <p className="description">
            앱을 시작하는 중에 일시적인 문제가 생겼습니다. 잠시 후 다시 시도해 주세요.
          </p>
        </main>
      </body>
    </html>
  );
}
