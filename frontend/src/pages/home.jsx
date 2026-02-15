import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import VideocamIcon from '@mui/icons-material/Videocam';
import AddIcon from '@mui/icons-material/Add';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    }

    return (
        <div className="homeWrapper">
            {/* Animated background orbs */}
            <div className="orb orb1" />
            <div className="orb orb2" />
            <div className="orb orb3" />

            {/* Navbar */}
            <nav className="homeNav">
                <div className="homeLogo">
                    <VideocamIcon style={{ fontSize: '1.6rem', color: '#00e5cc' }} />
                    <span>CallUp</span>
                </div>
                <div className="homeNavActions">
                    <button className="navGhostBtn" onClick={() => navigate("/history")}>
                        <RestoreIcon style={{ fontSize: '1.1rem' }} />
                        History
                    </button>
                    <button className="navLogoutBtn" onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/auth");
                    }}>
                        Logout
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <main className="homeMain">
                <div className="heroLeft">
                    <div className="heroBadge">🔴 Live Now</div>
                    <h1 className="heroTitle">
                        Connect.<br />
                        <span className="heroAccent">Collaborate.</span><br />
                        Create.
                    </h1>
                    <p className="heroSub">
                        Crystal-clear video meetings for teams of any size.
                        No downloads, no friction — just click and connect.
                    </p>

                    {/* Join card */}
                    <div className="joinCard">
                        <p className="joinCardLabel">Enter a meeting code to join</p>
                        <div className="joinRow">
                            <TextField
                                onChange={e => setMeetingCode(e.target.value)}
                                value={meetingCode}
                                placeholder="e.g. abc-123-xyz"
                                variant="outlined"
                                size="small"
                                sx={{
                                    flex: 1,
                                    '& .MuiOutlinedInput-root': {
                                        color: 'white',
                                        background: 'rgba(255,255,255,0.07)',
                                        borderRadius: '12px',
                                        '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
                                        '&:hover fieldset': { borderColor: '#00e5cc' },
                                        '&.Mui-focused fieldset': { borderColor: '#00e5cc' },
                                    },
                                    '& input::placeholder': { color: 'rgba(255,255,255,0.35)' },
                                    '& input': { color: 'white' },
                                }}
                            />
                            <button className="joinBtn" onClick={handleJoinVideoCall}>
                                Join
                            </button>
                        </div>

                        <div className="divider"><span>or</span></div>

                        <button className="newMeetBtn" onClick={() => {
                            const code = Math.random().toString(36).substring(2, 8);
                            setMeetingCode(code);
                            addToUserHistory(code);
                            navigate(`/${code}`);
                        }}>
                            <AddIcon style={{ fontSize: '1.1rem' }} />
                            Start a new meeting
                        </button>
                    </div>
                </div>

                {/* Right side — decorative video grid mockup */}
                <div className="heroRight">
                    <div className="videoGridMockup">
                        <div className="mockTile tile1">
                            <div className="mockAvatar">JD</div>
                            <span>Jay</span>
                        </div>
                        <div className="mockTile tile2">
                            <div className="mockAvatar" style={{ background: '#7c3aed' }}>KZ</div>
                            <span>Kizzie</span>
                        </div>
                        <div className="mockTile tile3">
                            <div className="mockAvatar" style={{ background: '#059669' }}>AM</div>
                            <span>Alex</span>
                        </div>
                        <div className="mockTile tile4 youTile">
                            <div className="mockAvatar" style={{ background: '#d97706' }}>You</div>
                            <span>You</span>
                            <div className="liveDot" />
                        </div>
                    </div>

                    {/* Floating stat cards */}
                    <div className="statCard statCard1">
                        <span className="statNum">4K</span>
                        <span className="statLabel">HD Video</span>
                    </div>
                    <div className="statCard statCard2">
                        <span className="statNum">99%</span>
                        <span className="statLabel">Uptime</span>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default withAuth(HomeComponent)