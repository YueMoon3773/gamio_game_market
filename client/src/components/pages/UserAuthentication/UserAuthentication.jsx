import { motion, animate } from 'framer-motion';
import { useState } from 'react';

const FRONT = { x: 0, y: 0, opacity: 1, zIndex: 2 };
const BACK = { x: 10, y: 10, opacity: 0.6, zIndex: 1 };

const UserAuthentication = () => {
    const [active, setActive] = useState('login');

    const loginProps = active === 'login' ? FRONT : BACK;
    const signupProps = active === 'signup' ? FRONT : BACK;

    const transition = { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] };

    return (
        <>
            <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={() => setActive('login')}>Log in</button>
                <button onClick={() => setActive('signup')}>Sign up</button>
            </div>

            <div style={{ position: 'relative', width: 320, height: 380 }}>
                <motion.div
                    animate={loginProps}
                    transition={transition}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'red',
                    }}
                >
                    <h1>log in</h1>
                </motion.div>

                <motion.div
                    animate={signupProps}
                    transition={transition}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'blue',
                    }}
                >
                    <h1>sign up</h1>
                </motion.div>
            </div>
        </>
    );
};

export default UserAuthentication;
