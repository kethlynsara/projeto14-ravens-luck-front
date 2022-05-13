import styled from 'styled-components';
import { BsBookmark } from 'react-icons/bs';

export default function BookElement({ elem }) {
    const { title, author, image } = elem;

    return (
        <Box>
            <div>
                <Cover src={image} />
                <span>
                    <Title>{title}</Title>
                    <Author>{author}</Author>
                </span>
            </div>
            <BsBookmark className="bookmark-icon" />
        </Box>
    )
}

const Box = styled.li`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;

    div {
        display: flex;
    }
`;

const Cover = styled.img`
    width: 72px;
    height: 105px;
    object-fit: cover;
    border-radius: 4px 8px 8px 4px;
    margin-right: 28px;
`;

const Title = styled.p`
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: var(--main-color);
    margin-bottom: 4px;
`;

const Author = styled.p`
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    color: var(--main-color);
    opacity: 0.5;
`;