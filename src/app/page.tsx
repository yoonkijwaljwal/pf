export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          안녕하세요, 저는 [이름]입니다 👋
        </h1>
        
        <p className="text-xl mb-8">
          웹 개발자를 꿈꾸는 열정적인 프로그래머입니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">기술 스택</h2>
            <ul className="list-disc list-inside">
              <li>React / Next.js</li>
              <li>JavaScript / TypeScript</li>
              <li>HTML / CSS</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">프로젝트</h2>
            <ul className="list-disc list-inside">
              <li>포트폴리오 웹사이트</li>
              <li>Todo 앱</li>
              <li>날씨 앱</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
} 