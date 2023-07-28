import Posts from "../components/Posts";
import Body from "../components/Body";

export default function FeedPage() {

    return (
        <Body sidebar>
            <Posts write={true} />
        </Body>
    )
}