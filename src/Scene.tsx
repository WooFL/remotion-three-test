import { getVideoMetadata, VideoMetadata } from "@remotion/media-utils";
import { ThreeCanvas, useVideoTexture } from "@remotion/three";
import { useRef, useState, useEffect } from "react";
import { AbsoluteFill, staticFile, useCurrentFrame, useVideoConfig, Video } from "remotion";
 
const Scene: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();
    
    const videoRef = useRef<HTMLVideoElement>(null);
	
	const [videoData, setVideoData] = useState<VideoMetadata | null>(null);
    const videoSrc = staticFile('intro.mp4')
	useEffect(() => {
		getVideoMetadata(videoSrc)
			.then((data) => setVideoData(data))
			.catch((err) => console.log(err));
	}, [videoSrc]);

	const texture = useVideoTexture(videoRef);
  return (
    <AbsoluteFill>
  	<Video ref={videoRef} src={videoSrc} style={{position:'absolute', opacity:0}} />
    <ThreeCanvas
      orthographic={false}
      width={width}
      height={height}
      style={{
        backgroundColor: "white",
      }}
      camera={{ fov: 75, position: [0, 0, 470] }}
    >
      <ambientLight intensity={0.15} />
      <pointLight args={[undefined, 0.4]} position={[200, 200, 0]} />
      <mesh
        position={[0, 0, 0]}
      >
        <boxGeometry args={[100, 100, 100]} />
        <meshStandardMaterial
          map={texture}
        />
      </mesh>
    </ThreeCanvas>
    </AbsoluteFill>
  );
};
 
export default Scene;