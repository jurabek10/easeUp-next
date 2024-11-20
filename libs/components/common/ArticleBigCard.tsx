import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Property } from '../../types/property/property';
import { REACT_APP_API_URL } from '../../config';
import { formatterStr } from '../../utils';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { BoardArticle } from '../../types/board-article/board-article';

interface ArticleBigCardProps {
	article: BoardArticle;
}

const ArticleBigCard = (props: ArticleBigCardProps) => {
	const { article } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const router = useRouter();

	/** HANDLERS **/
	const goPropertyDetatilPage = (articleId: string) => {
		router.push(`/article/detail?id=${articleId}`);
	};

	if (device === 'mobile') {
		return <div>APARTMEND BIG CARD</div>;
	} else {
		return (
			<Stack className="property-big-card-box" onClick={() => goPropertyDetatilPage(article?._id)}>
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${article?.articleImage})` }}
				>
					{/* {property?.propertyRank && property?.propertyRank >= 2 && (
						<div className={'status'}>
							<img src="/img/icons/star.svg" alt="" />
						</div>
					)} */}

					<div className={'price'}>{article?.articleCategory} </div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}>{article?.articleTitle}</strong>
					<p className={'desc'}>{article?.articleContent}</p>
					{/* <div className={'options'}>
						<div>
							<img src="/img/icons/bed.svg" alt="" />
							<span>{property?.propertyBeds} bed</span>
						</div>
						<div>
							<img src="/img/icons/bath.svg" alt="" />
							<span>{property?.propertyBath} baths</span>
						</div>
						<div>
							<img src="/img/icons/guests.svg" alt="" />
							<span>{property?.propertyGuests} guests</span>
						</div>
					</div> */}
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<div className="buttons-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{article?.articleViews}</Typography>
							<IconButton
								color={'default'}
								onClick={(e) => {
									e.stopPropagation();
								}}
							>
								{article?.meLiked && article?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{article?.articleLikes}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	}
};

export default ArticleBigCard;