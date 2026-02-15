import * as React from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

export default function Authentication() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async () => {
        try {
            if (formState === 0) {
                await handleLogin(username, password);
            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                setUsername("");
                setMessage(result.message);
                setOpen(true);
                setError("");
                setFormState(0);
                setPassword("");
            }
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err?.message || "Something went wrong";
            setError(errorMessage);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleAuth();
    }

    return (
        <div className="authWrapper">
            {/* Animated orbs */}
            <div className="authOrb authOrb1" />
            <div className="authOrb authOrb2" />
            <div className="authOrb authOrb3" />

            {/* Left decorative panel */}
            <div className="authLeft">
                <div className="authLeftContent">
                    <div className="authBrand">
                        <VideocamIcon style={{ fontSize: '2rem', color: '#00e5cc' }} />
                        <span>CallUp</span>
                    </div>
                    <h2 className="authLeftTitle">
                        Your meetings,<br />
                        <span className="authLeftAccent">reimagined.</span>
                    </h2>
                    <p className="authLeftSub">
                        Join thousands of teams who use CallUp for seamless, high-quality video collaboration.
                    </p>

                    {/* Feature pills */}
                    <div className="authFeatures">
                        <div className="authFeaturePill">🎥 HD Video</div>
                        <div className="authFeaturePill">💬 Live Chat</div>
                        <div className="authFeaturePill">🔒 Secure</div>
                        <div className="authFeaturePill">⚡ No Lag</div>
                    </div>

                    {/* Decorative mockup cards */}
                    <div className="authMockCards">
                        <div className="authMockCard">
                            <div className="authMockDot" style={{ background: '#00e5cc' }} />
                            <div className="authMockAvatar">JD</div>
                            <div className="authMockInfo">
                                <span className="authMockName">Jay</span>
                                <span className="authMockStatus">In a meeting</span>
                            </div>
                        </div>
                        <div className="authMockCard" style={{ marginLeft: '24px', opacity: 0.7 }}>
                            <div className="authMockDot" style={{ background: '#7c3aed' }} />
                            <div className="authMockAvatar" style={{ background: 'linear-gradient(135deg,#7c3aed,#4f46e5)' }}>KZ</div>
                            <div className="authMockInfo">
                                <span className="authMockName">Kizzie</span>
                                <span className="authMockStatus">Available</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right form panel */}
            <div className="authRight">
                <div className="authCard">
                    {/* Icon */}
                    <div className="authIconWrap">
                        {formState === 0
                            ? <LockOutlinedIcon style={{ fontSize: '1.4rem', color: '#00e5cc' }} />
                            : <PersonAddOutlinedIcon style={{ fontSize: '1.4rem', color: '#00e5cc' }} />
                        }
                    </div>

                    <h3 className="authCardTitle">
                        {formState === 0 ? 'Welcome back' : 'Create account'}
                    </h3>
                    <p className="authCardSub">
                        {formState === 0 ? 'Sign in to join your meetings' : 'Get started with CallUp for free'}
                    </p>

                    {/* Toggle tabs */}
                    <div className="authTabs">
                        <button
                            className={`authTab ${formState === 0 ? 'authTabActive' : ''}`}
                            onClick={() => { setFormState(0); setError(""); }}
                        >
                            Sign In
                        </button>
                        <button
                            className={`authTab ${formState === 1 ? 'authTabActive' : ''}`}
                            onClick={() => { setFormState(1); setError(""); }}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Form fields */}
                    <div className="authFields">
                        {formState === 1 && (
                            <div className="authField">
                                <label className="authLabel">Full Name</label>
                                <input
                                    className="authInput"
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                        )}
                        <div className="authField">
                            <label className="authLabel">Username</label>
                            <input
                                className="authInput"
                                type="text"
                                placeholder="your_username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <div className="authField">
                            <label className="authLabel">Password</label>
                            <input
                                className="authInput"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>

                    {error && <p className="authError">{error}</p>}

                    <button className="authSubmitBtn" onClick={handleAuth}>
                        {formState === 0 ? 'Sign In' : 'Create Account'}
                    </button>

                    <p className="authSwitch">
                        {formState === 0 ? "Don't have an account? " : "Already have an account? "}
                        <span onClick={() => { setFormState(formState === 0 ? 1 : 0); setError(""); }}>
                            {formState === 0 ? 'Sign up' : 'Sign in'}
                        </span>
                    </p>
                </div>
            </div>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                message={message}
                onClose={() => setOpen(false)}
            />
        </div>
    );
}