import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import HistoryIcon from '@mui/icons-material/History';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(null);
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch (e) {
                setError("Could not load history. Please try again.");
                console.log(e);
            } finally {
                setLoading(false);
            }
        }
        fetchHistory();
    }, [])

    let formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    let formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    let handleCopy = (code, index) => {
        navigator.clipboard.writeText(code);
        setCopied(index);
        setTimeout(() => setCopied(null), 2000);
    }

    return (
        <div className="historyWrapper">
            <div className="historyBg" />

            {/* Navbar */}
            <nav className="historyNav">
                <div className="historyNavBrand">
                    <VideocamIcon style={{ color: '#00e5cc', fontSize: '1.5rem' }} />
                    <span>CallUp</span>
                </div>
                <button className="historyNavHome" onClick={() => routeTo("/home")}>
                    <HomeIcon style={{ fontSize: '1.1rem' }} />
                    Back to Home
                </button>
            </nav>

            {/* Main */}
            <div className="historyContent">

                {/* Header */}
                <div className="historyHeader">
                    <div className="historyIconWrap">
                        <HistoryIcon style={{ fontSize: '1.6rem', color: '#00e5cc' }} />
                    </div>
                    <div>
                        <h1 className="historyTitle">Meeting History</h1>
                        <p className="historySub">All your past meetings in one place</p>
                    </div>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="historyEmpty">
                        <div className="historySpinner" />
                        <p>Loading your history...</p>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="historyErrorBox">⚠️ {error}</div>
                )}

                {/* Empty */}
                {!loading && !error && meetings.length === 0 && (
                    <div className="historyEmpty">
                        <span style={{ fontSize: '3rem' }}>📭</span>
                        <p>No meetings yet</p>
                        <span className="historyEmptySub">Join a meeting and it will appear here</span>
                        <button className="historyJoinBtn" onClick={() => routeTo("/home")}>
                            Go to Home
                        </button>
                    </div>
                )}

                {/* Cards */}
                {!loading && meetings.length > 0 && (
                    <>
                        <p className="historyCount">
                            {meetings.length} meeting{meetings.length !== 1 ? 's' : ''} found
                        </p>
                        <div className="historyGrid">
                            {meetings.map((e, i) => (
                                <div className="historyCard" key={i}>
                                    <div className="historyCardTop">
                                        <div className="historyCardIcon">📹</div>
                                        <span className="historyCardBadge">Attended</span>
                                    </div>
                                    <div className="historyCardCode">{e.meetingCode}</div>
                                    <div className="historyCardMeta">
                                        <span>📅 {formatDate(e.date)}</span>
                                        <span>🕐 {formatTime(e.date)}</span>
                                    </div>
                                    <div className="historyCardActions">
                                        <button
                                            className="historyCardCopy"
                                            onClick={() => handleCopy(e.meetingCode, i)}
                                        >
                                            <ContentCopyIcon style={{ fontSize: '0.9rem' }} />
                                            {copied === i ? 'Copied!' : 'Copy Code'}
                                        </button>
                                        <button
                                            className="historyCardJoin"
                                            onClick={() => routeTo(`/${e.meetingCode}`)}
                                        >
                                            Rejoin
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}