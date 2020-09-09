import React from 'react';
import { Grid, Grow, Typography} from '@material-ui/core';
import NewsCard from '../NewsCard/NewsCard';
import classNames from 'classnames';

import useStyles from './styles';

const infoCards = [
    { color: '#A0b2eb', title: 'Latest News', text: '(click the mic icon first) "Give me the latest news". When in news say: "Go back" or you can ask,"What does this app do?" '},
    { color: '#e6ccff', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
    { color: '#8458b3', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Iphone, Biden...', text: 'What\'s up with PlayStation 5. After you are in the news page, say "open number 3"' },
    { color: '#494d5f', title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, Bloomberg, ABC News...', text: 'Give me the news from CNN' },
  ];

const NewsCards = ( { articles, activeArticle}) => {
    const classes = useStyles();
    if(!articles.length){
        return(
            <Grow in>
                <Grid className={classNames(classes.container)} container alignItems="stretch" spacing={2}>
                    {infoCards.map((infoCard) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoCard}>
                            <div className={classes.card} style={{ backgroundColor: infoCard.color }}>
                                <Typography variant="h5" component="h5">{infoCard.title}</Typography>
                                {infoCard.info 
                                ? <Typography variant="h6" component="h6">
                                    <strong>{infoCard.title.split(' ')[2]}</strong>:<br />
                                {infoCard.info}</Typography> : null}
                                <Typography variant="h6" component="h6">Try saying: <br /> <i>{infoCard.text}</i></Typography>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Grow>
        );
    }
    return (
        <Grow in>
            <Grid className={classes.container} container alignItems="stretch" spaceing={2}>

            { articles.map(( article, i ) => (
                <Grid item xs={12} md={4} lg = {3} style={{ display: 'flex' }}>
                    <NewsCard  article={article} activeArticle={activeArticle} i={i}/>
                </Grid>
            ))}
            </Grid>
        </Grow>
    )
}
export default NewsCards
