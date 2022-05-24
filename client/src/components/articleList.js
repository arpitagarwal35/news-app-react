import React from "react";
import { List, Grid, Header, Image, Segment } from "semantic-ui-react";
import Moment from 'react-moment';

const ArticleItem = (props) => {
    const { article } = props;
    return (
        <Segment>
            <List.Item >
                <Grid>
                    <Grid.Column width={12}>
                        <Header as="h3">
                            <a href={article.url}>{article.title}</a>
                        </Header>
                        <List.Description>
                            {article.description}
                        </List.Description>
                        <List relaxed horizontal>
                            <List.Item>
                                <Moment utc fromNow>{article.publishedAt}</Moment>
                            </List.Item>
                            <List.Item>
                                <a href={article.url}>{article.source.name}</a>
                            </List.Item>
                            <List.Item>
                                {article.author}
                            </List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Image src={article.urlToImage} size='medium' rounded/>
                    </Grid.Column>
                </Grid>
            </List.Item>
        </Segment>
    );
};

const ArticleList = (props) => {
    return (
        <List divided style={{ margin: "10 auto" }}>
            {props.articles.map((article, index) => (
                <ArticleItem article={article} key={article.title + index} />
            ))}
        </List>
    );
};

export default ArticleList;
