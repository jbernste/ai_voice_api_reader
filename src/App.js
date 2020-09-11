import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles';
import wordsToNumbers from 'words-to-numbers';

const alanKey ='69645e9ac9ffd2bef208941dc219ac492e956eca572e1d8b807a3e2338fdd0dc/stage' ;
const App = () => {
    const[ newsArticles, setNewsArticles ] = useState ([]);
    const [ activeArticle, setActiveArticle ] = useState(-1);
    const classes = useStyles();

    //a function to refresh the page and go back.
    function refreshPage() {
        window.location.reload(false);
    }

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if (command === 'new:Headlines') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if(command === 'highlight'){
                        setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if(command === 'goback'){
                    refreshPage()
                } else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];

                    if (parsedNumber > 20) {
                      alanBtn().playText('Please try that again...');
                    } else if (article) {
                      window.open(article.url, '_blank');
                      alanBtn().playText('Opening...');
                    } else {
                      alanBtn().playText('Please try that again...');
                    }
                }
            }
        })
    }, []);

    return (
        <div>
            <div className={classes.cardHeader}><h2>AI VOICE NEWS READER   </h2> <div className={classes.image}><h3>{ '  ' } + Joshua Bernstein <br /> Fullstack Developer +</h3></div></div>

                <div className={classes.logoContainer}> <img src="https://miro.medium.com/max/3840/1*zlt_wRZCGofSbmSqduds9w.png" className={classes.mainLogo} alt="mainlogo" />
                <img src="https://alan.app/voice/images/branding_page/seal/color/alan-seal-horizontal-color.svg?1b8b70bb71eb5a4b7ca2fbde38a13237" className={classes.logo} alt="alanLogo" />
                </div>
            <div className={classes.logoContainer}>

            </div>

             <NewsCards articles={ newsArticles } activeArticle = {activeArticle} />
        </div>
    );
}

export default App
