import { useState, useEffect } from "react";
import ViewCount from "./ViewCount";

const VideoList = ({ videos }) => {
  const [viewCount, setViewCount] = useState({}); // viewCount는 객체로 관리
  const [currentVideoId, setCurrentVideoId] = useState(null);

  const handleVideoClick = (videoId) => {
    setCurrentVideoId(videoId); // 선택된 비디오 ID로 업데이트
  };

  useEffect(() => {
    // viewCount가 변경될 때마다 해당 조회수를 가진 비디오 목록을 업데이트합니다.
    if (Object.keys(viewCount).length > 0) {
      const updatedVideos = videos.map((video) => ({
        title: video.snippet.title,
        viewCount: parseInt(viewCount[video.id.videoId]) || 0, // videoId에 해당하는 조회수
        videoId: video.id.videoId,
        description: video.snippet.description,
      }));

      console.table(updatedVideos); // 비디오 목록 출력
    }
  }, [viewCount, videos]);

  // useEffect(() => {
  //   if (viewCount !== null) {
  //     const updatedVideos = videos.map((video) => ({
  //       title: video.snippet.title,
  //       viewCount: viewCount,
  //       videoId: video.id.videoId,
  //       description: video.snippet.description,
  //     }));

  //     console.table(updatedVideos);
  //   }
  // }, [viewCount]);

  return (
    <div>
      {/* 선택된 비디오를 상단에 임베드 */}
      {currentVideoId && (
        <div>
          <iframe width="560" height="315" src={`https://www.youtube.com/embed/${currentVideoId}`} style={{ border: "none" }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="YouTube Video Player"></iframe>
        </div>
      )}

      {/* 비디오 목록 표시 */}
      <ul>
        {videos.map((video) => (
          <li key={video.id.videoId}>
            <a
              onClick={(e) => {
                e.preventDefault();
                handleVideoClick(video.id.videoId);
              }}
              href="#"
            >
              <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title}></img>
            </a>
            <div>
              <h3>{video.snippet.title}</h3>
              <p>{video.snippet.description}</p>
              <ViewCount
                videoId={video.id.videoId}
                onViewCountFetched={(count) => {
                  setViewCount((prevCount) => ({
                    ...prevCount,
                    [video.id.videoId]: count, // videoId에 해당하는 조회수 업데이트
                  }));
                }}
              ></ViewCount>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
