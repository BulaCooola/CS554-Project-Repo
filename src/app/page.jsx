export default function Home() {
  return (
    <div className="hero min-h-screen" style={{backgroundImage: 'url(https://cdn.pixabay.com/photo/2013/12/12/21/48/football-stadium-227561_1280.jpg)'}}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">TourneyPro</h1>
          <p>Create a team.</p>
          <p>Start tournaments with your friends.</p>
          <p>Compete for a title.</p>
          <p>Browse and meet competitors like you.</p>
        </div>
      </div>
    </div>
  );
}
