import 'dotenv/config';
import { LemmyBot } from 'lemmy-bot';
import { MongoClient } from 'mongodb';

const USERNAME = process.env.LEMMY_USERNAME || '';
const PASSWORD = process.env.LEMMY_PASSWORD || '';
const INSTANCE = process.env.LEMMY_INSTANCE || '';
const OWN_ACTOR_ID = `https://${INSTANCE}/u/${USERNAME}`;
const MONGODB_URI = process.env.MONGODB_URI || '';
const COMMUNITY = 'lemmy.basedcount.com/c/pcm';

const client = new MongoClient(MONGODB_URI);

const bot = new LemmyBot({
    instance: INSTANCE,
    handlers: {
        comment: async ({
            commentView: {
                comment: { id: commentId },
                post: { id: postId },
                community: { actor_id: communityActorId },
                creator: { actor_id: actorId }
            },
            botActions: { createComment },
            preventReprocess
        }) => {
            if (actorId === OWN_ACTOR_ID || communityActorId !== COMMUNITY) return;

            /*
                Use commentId and createComment to reply to comment => createComment({ post_id: postId, content: 'SAMPLE TEXT', parent_id: id });
            */

            preventReprocess();
        },
        post: async ({
            postView: {
                post: { id: postId },
                community: { actor_id: communityActorId },
                creator: { actor_id: actorId }
            },
            botActions: { createComment },
            preventReprocess
        }) => {
            if (actorId === OWN_ACTOR_ID || communityActorId !== COMMUNITY) return;

            /*
                Use postId and createComment to reply to comment => createComment({ post_id: postId, content: 'SAMPLE TEXT', parent_id: null (or leave empty?) });
            */

            preventReprocess();
        },
    }
});


async function run() {
    
    bot.start();
}