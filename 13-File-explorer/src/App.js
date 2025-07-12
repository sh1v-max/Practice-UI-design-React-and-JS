import FileExplorer from "./Components/FileExplorer";
import "./styles.css";
import data from "./data.json"

export default function App() {
  return (
    <div style={{ padding: "2rem", background: "#f9f9f9", minHeight: "100vh" }}>
      <h2>📁 File Explorer</h2>
      <FileExplorer folderData={data} />
    </div>
  );
}
