import React, { useEffect, useState } from "react";

import Button from "./Button/Button";

import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import CallEndIcon from "@mui/icons-material/CallEnd";

import "./Toolbar.css";

function Toolbar(props) {
  const [audioMuted, setAudioMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);

  const handleAudioMute = () => {
    const muted = props.pexRTC.muteAudio(!audioMuted);
    setAudioMuted(muted);
  };

  const handleVideoMute = async () => {
    const muted = props.pexRTC.muteVideo(!videoMuted);
    setVideoMuted(muted);
    if (muted) {
      props.pexRTC.onSetup(null);
    } else {
      props.pexRTC.onSetup(props.pexRTC.call.mediaStream)
    }
  };

  const handleHangUp = () => {
    props.pexRTC.disconnect();
    props.pexRTC.onDisconnect();
  };

  const className = [props.className, "Toolbar"].join(" ");

  return (
    <div className={className}>
      <Button
        onClick={handleAudioMute}
        selected={audioMuted}
        icon={audioMuted ? <MicOffIcon /> : <MicIcon />}
      />
      <Button
        onClick={handleVideoMute}
        selected={videoMuted}
        icon={videoMuted ? <VideocamOffIcon /> : <VideocamIcon />}
      />
      <Button onClick={handleHangUp} icon={<CallEndIcon />} />
    </div>
  );
}

export default Toolbar;
