import "@/App.css";
import { Blobs } from "@/components/background/BlobBackgroud";
function App() {
  return (
    <div className="container py-10">
      <Blobs />
      <div className="flex h-dvh items-center justify-center">
        <h2 className="text-5xl font-black">liquid background</h2>
      </div>
    </div>
  );
}

export default App;
