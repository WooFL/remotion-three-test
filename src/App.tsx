import { Player } from "@remotion/player";
import Scene from "./Scene";
 
export const App: React.FC = () => {
  return (
    <Player
      component={Scene}
      durationInFrames={120}
      compositionWidth={360}
      compositionHeight={640}
      fps={30}
      controls
    />
  );
};

export default App;
