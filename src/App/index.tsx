import React from 'react';
import { useSelector } from 'react-redux';
import {
  bottomTexSelector,
  imageSelector,
  memeBottomText,
  memeRandomImage,
  memeTopText,
  topTextSelector,
} from '../redux/slices/ItemsSlice';
import { fetchMemes, itemsMemeSelect } from '../redux/slices/memeSlice';
import { useAppDispatch } from '../redux/store';
import styles from './app.module.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const apiData = useSelector(itemsMemeSelect);

  const topText = useSelector(topTextSelector);
  const bottomText = useSelector(bottomTexSelector);
  const randomImage = useSelector(imageSelector);

  React.useEffect(() => {
    dispatch(fetchMemes());
    // eslint-disable-next-line
  }, []);

  const getMemeImage = () => {
    const randomNumber = Math.floor(Math.random() * apiData.length);
    const url = apiData[randomNumber].url;
    dispatch(memeRandomImage(url));
  };

  const textTopChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(memeTopText(event.target.value));
  const textBottomChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(memeBottomText(event.target.value));

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.top}>
          <h1 className={styles.title}>Meme Generator</h1>
          <div className={styles.inputs}>
            <input
              name="topText"
              value={topText}
              onChange={textTopChange}
              type="text"
              placeholder="Top text"
            />
            <input
              name="bottomText"
              value={bottomText}
              onChange={textBottomChange}
              type="text"
              placeholder="Bottom text"
            />
          </div>
          <button onClick={getMemeImage}>Get a new meme image</button>
        </div>
        <div className={styles.img}>
          <h2 className={styles.img__texttop}>{topText}</h2>
          <img src={randomImage} alt="Content" />
          <h2 className={styles.img__textbottom}>{bottomText}</h2>
        </div>
      </div>
    </div>
  );
};

export default App;
