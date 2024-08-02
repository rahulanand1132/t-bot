import { useEffect, useState } from 'react';
import { Button, Progress, Spin } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import styles from './checkUserRating.module.css';
import { motion, AnimatePresence } from 'framer-motion';
const tele = window.Telegram.WebApp;
const currentUserName=tele.initDataUnsafe?.user?.username;

export default function CheckUserRating() {
    const [ratingProgress, setRatingProgress] = useState(0);
    const [nameUniquenessProgress, setNameUniquenessProgress] = useState(0);
    const [fetchingDetailsProgress, setFetchingDetailsProgress] = useState(0);
    const [showFetchingDetails, setShowFetchingDetails] = useState(false)
    const [showCheckingName, setShowCheckingName] = useState(false)
    const [showRating, setShowRating] = useState(false);
    const [ratingFinished,setRatingFinished] = useState(false)

    useEffect(()=>{
        startFetchingDetailsTimer()
    },[])

    // const getRandomNumber = () => {
    //     console.log('random number fetched!!!!!!');
    //     return Math.floor(Math.random() * (55 - 15 + 1)) + 25;
    // };
    const calculateRating = (username) => {
        const lengthScore = 100 - username.length * 2; // Smaller length, higher score
        const numberScore = 100 - (username.match(/\d/g) || []).length * 5; // Lesser numbers, higher score
        const specialCharScore = 100 - (username.match(/[^a-zA-Z0-9]/g) || []).length * 10; // Lesser special characters, higher score
      
        // Order of rating values: characters > numbers > special characters
        const totalScore = (lengthScore * 0.5) + (numberScore * 0.3) + (specialCharScore * 0.2);
      
        return Math.max(0, Math.min(100, totalScore)); // Ensure the score is between 0 and 100
      };

    const interpolateColor = (color1, color2, factor) => {
        const result = color1.slice(1).match(/.{2}/g).map((hex, i) => {
          return Math.round(parseInt(hex, 16) + factor * (parseInt(color2.slice(1).match(/.{2}/g)[i], 16) - parseInt(hex, 16)));
        });
        return `#${result.map(value => value.toString(16).padStart(2, '0')).join('')}`;
      };

    const startFetchingDetailsTimer = () => {
        // console.log('started startFetchingDetailsTimer called times#####################');
        setShowFetchingDetails(true)
        let intervel
        intervel = setInterval(() => {
            setFetchingDetailsProgress((oldValue) => {
                if (oldValue >= 100) {
                    clearInterval(intervel);
                    startCheckingNameTimer();
                    console.log('Finished startFetchingDetailsTimer');
                    return oldValue;
                } else {
                    const newValue = oldValue + 1;
                    // console.log('current progress>>', newValue);
                    return newValue;
                }
            });
        }, 50);
    }

    const startCheckingNameTimer = () => {
        console.log('started startCheckingNameTimer');
        setShowCheckingName(true);

        const intervel = setInterval(() => {
            console.log('startCheckingNameTimer called count');
            setNameUniquenessProgress((oldValue) => {
                if (oldValue >= 100) {
                    clearInterval(intervel);
                    startRatingTimer();
                    console.log('Finished startCheckingNameTimer');
                    return oldValue; // Return the same value to avoid unnecessary state updates
                } else {
                    const newValue = oldValue + 1;
                    // console.log('current progress>>', newValue);
                    return newValue;
                }
            });
        }, 50);
    };

    const startRatingTimer = () => {
        console.log('started startRatingTimer , user rating>>',calculateRating(currentUserName));
        setShowRating(true);
        // let currentRandomNumber = 100-getRandomNumber()
        const intervel = setInterval(() => {
            setRatingProgress((oldValue) => {
                if (oldValue >= calculateRating(currentUserName)) {
                    clearInterval(intervel);
                    setRatingFinished(true)
                    console.log('Finished startRatingTimer');
                    return oldValue;
                } else {
                    const newValue = oldValue + 1;
                    // console.log('current progress>>', newValue);
                    return newValue;
                }
            });
        }, 200);
    };

    return (
        <div className={styles.container}>
            <p className={styles.contentText}>Find Your Name's Uniqueness!!</p>
            <AnimatePresence>
                {showFetchingDetails&&<motion.div
                    key={1}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className={styles.progressContainer}>
                        <p className={styles.contentStatusText}>Fetching Your Details</p>
                        <Progress
                            type="circle"
                            percent={fetchingDetailsProgress}
                            // steps={{ count: 20, gap: 3 }}
                            trailColor={'#1d1d1d'}
                            // strokeWidth={20}
                            size={100}
                            // strokeColor={'#108ee9'}
                            format={percent => (
                                percent !== 100
                                    ? <span style={{ color: '#108ee9' }}>{percent}%</span>
                                    : <span style={{ color: '#00FF00' }}><CheckOutlined /></span>
                            )}
                            className={styles.progressStyle} />
                    </div>
                </motion.div>}
                {showCheckingName&&<motion.div
                    key={2}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}>
                    <div className={styles.progressContainer}>
                        <p className={styles.contentStatusText}>Checking Your Name's Uniqueness</p>
                        <Progress
                            type="circle"
                            percent={nameUniquenessProgress}
                            // steps={{ count: 20, gap: 3 }}
                            trailColor={'#1d1d1d'}
                            // strokeWidth={20}
                            size={100}
                            // strokeColor={'#108ee9'}
                            format={percent => (
                                percent !== 100
                                    ? <span style={{ color: '#108ee9' }}>{percent}%</span>
                                    : <span style={{ color: '#00FF00' }}><CheckOutlined /></span>
                            )}
                            className={styles.progressStyle} />
                    </div>
                </motion.div>}
                {showRating&&<motion.div
                    key={3}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}>
                    <div className={styles.resultContainer}>
                        <Progress
                            trailColor={'#1d1d1d'}
                            type="dashboard"
                            percent={ratingProgress}
                            strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
                            format={percent => (<span style={{ color: interpolateColor('#108ee9', '#87d068', ratingProgress / 100) }}>{100 - ratingProgress}%</span>)}
                        />
                        <p className={styles.resultText}>Your User Name Rating Is Among Top <span style={{ color: interpolateColor('#108ee9', '#87d068', ratingProgress / 100)}}>{!ratingFinished?<Spin/>:`${100-ratingProgress}%`}</span> of users</p>
                    </div>
                </motion.div>}
            </AnimatePresence>
            {/* <Button onClick={() => startTimer()}>Set Loading</Button> */}
        </div>
    )
}