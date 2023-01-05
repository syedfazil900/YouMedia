import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFromApi } from "../utils/fetchFromApi";
import ChannelCard from "./ChannelCard";
import Videos from "./Videos";

export const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetchFromApi(`channels?part=snippet&id=${id}`).then((data) => {
      setChannelDetail(data?.items[0]);
    });
    fetchFromApi(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => {
        setVideos(data?.items);
      }
    );
  }, [id]);
  return (
    <Box minHeight={"95vh"}>
      <Box>
        <div
          style={{
            background:
              "linear-gradient(248deg, rgba(2,0,36,1) 0%, rgba(77,105,214,1) 37%, rgba(141,17,207,1) 100%)",
            zIndex: 10,
            height: "300px",
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop={"-120px"} />
      </Box>
      <Box display={"flex"} p={2}>
        <Box sx={{ mr: { md: "100px" } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};
