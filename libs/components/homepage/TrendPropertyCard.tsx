// // import React from 'react';
// // import { Stack, Box, Divider, Typography } from '@mui/material';
// // import IconButton from '@mui/material/IconButton';
// // import useDeviceDetect from '../../hooks/useDeviceDetect';
// // import FavoriteIcon from '@mui/icons-material/Favorite';
// // import { Property } from '../../types/property/property';
// // import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// // import { REACT_APP_API_URL } from '../../config';
// // import { useRouter } from 'next/router';
// // import { useReactiveVar } from '@apollo/client';
// // import { userVar } from '../../../apollo/store';

// // interface TrendPropertyCardProps {
// // 	property: Property;
// // }

// // const TrendPropertyCard = (props: TrendPropertyCardProps) => {
// // 	const { property } = props;
// // 	const device = useDeviceDetect();
// // 	const router = useRouter();
// // 	const user = useReactiveVar(userVar);

// // 	/** HANDLERS **/

// // 	if (device === 'mobile') {
// // 		return (
// // 			<Stack className="trend-card-box" key={property._id}>
// // 				<Box
// // 					component={'div'}
// // 					className={'card-img'}
// // 					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages[0]})` }}
// // 				>
// // 					<div>${property.propertyPrice}</div>
// // 				</Box>
// // 				<Box component={'div'} className={'info'}>
// // 					<strong className={'title'}>{property.propertyTitle}</strong>
// // 					<p className={'desc'}>{property.propertyDesc ?? 'no description'}</p>
// // 					<div className={'options'}>
// // 						<div>
// // 							<img src="/img/icons/bed.svg" alt="" />
// // 							<span>{property.propertyBeds} bed</span>
// // 						</div>
// // 						<div>
// // 							<img src="/img/icons/bath.svg" alt="" />
// // 							<span>{property.propertyBath} baths</span>
// // 						</div>
// // 						<div>
// // 							<img src="/img/icons/guests.svg" alt="" />
// // 							<span>{property.propertyGuests} guests</span>
// // 						</div>
// // 					</div>
// // 					<Divider sx={{ mt: '15px', mb: '17px' }} />
// // 					<div className={'bott'}>
// // 						<p>
// // 							{property.propertyFamily ? 'Family' : ''} {property.propertyFamily && property.propertySeasonal && '/'}{' '}
// // 							{property.propertySeasonal ? 'Seasonal' : ''}
// // 						</p>
// // 						<div className="view-like-box">
// // 							<IconButton color={'default'}>
// // 								<RemoveRedEyeIcon />
// // 							</IconButton>
// // 							<Typography className="view-cnt">{property?.propertyViews}</Typography>
// // 							<IconButton color={'default'}>
// // 								{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
// // 									<FavoriteIcon style={{ color: 'red' }} />
// // 								) : (
// // 									<FavoriteIcon />
// // 								)}
// // 							</IconButton>
// // 							<Typography className="view-cnt">{property?.propertyLikes}</Typography>
// // 						</div>
// // 					</div>
// // 				</Box>
// // 			</Stack>
// // 		);
// // 	} else {
// // 		return (
// // 			<Stack className="trend-card-box" key={property._id}>
// // 				<Box
// // 					component={'div'}
// // 					className={'card-img'}
// // 					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages[0]})` }}
// // 				>
// // 					<div>${property.propertyPrice} / night</div>
// // 				</Box>
// // 				<Box component={'div'} className={'info'}>
// // 					<strong className={'title'}>{property.propertyTitle}</strong>
// // 					<p className={'desc'}>{property.propertyDesc ?? 'no description'}</p>
// // 					<div className={'options'}>
// // 						<div>
// // 							<img src="/img/icons/bed.svg" alt="" />
// // 							<span>{property.propertyBeds} bed</span>
// // 						</div>
// // 						<div>
// // 							<img src="/img/icons/bath.svg" alt="" />
// // 							<span>{property.propertyBath} baths</span>
// // 						</div>
// // 						<div>
// // 							<img src="/img/icons/guests.svg" alt="" />
// // 							<span>{property.propertyGuests} guests</span>
// // 						</div>
// // 					</div>
// // 					<Divider sx={{ mt: '15px', mb: '17px' }} />
// // 					<div className={'bott'}>
// // 						<p>
// // 							{property.propertyFamily ? 'Family' : ''} {property.propertyFamily && property.propertySeasonal && '/'}{' '}
// // 							{property.propertySeasonal ? 'Seasonal' : ''}
// // 						</p>
// // 						<div className="view-like-box">
// // 							<IconButton color={'default'}>
// // 								<RemoveRedEyeIcon />
// // 							</IconButton>
// // 							<Typography className="view-cnt">{property?.propertyViews}</Typography>
// // 							<IconButton color={'default'}>
// // 								{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
// // 									<FavoriteIcon style={{ color: 'red' }} />
// // 								) : (
// // 									<FavoriteIcon />
// // 								)}
// // 							</IconButton>
// // 							<Typography className="view-cnt">{property?.propertyLikes}</Typography>
// // 						</div>
// // 					</div>
// // 				</Box>
// // 			</Stack>
// // 		);
// // 	}
// // };

// // export default TrendPropertyCard;

// import React from 'react';
// import { Stack, Box, Divider, Typography } from '@mui/material';
// import IconButton from '@mui/material/IconButton';
// import useDeviceDetect from '../../hooks/useDeviceDetect';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import { Property } from '../../types/property/property';
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import { REACT_APP_API_URL } from '../../config';
// import { useRouter } from 'next/router';
// import { useReactiveVar } from '@apollo/client';
// import { userVar } from '../../../apollo/store';

// interface TrendPropertyCardProps {
// 	property: Property;
// }

// const TrendPropertyCard = (props: TrendPropertyCardProps) => {
// 	const { property } = props;
// 	const device = useDeviceDetect();
// 	const router = useRouter();
// 	const user = useReactiveVar(userVar);

// 	/** HANDLERS **/

// 	if (device === 'mobile') {
// 		return (
// 			<Stack className="trend-card-box" key={property._id}>
// 				<Box
// 					component={'div'}
// 					className={'card-img'}
// 					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages[0]})` }}
// 				>
// 					<div>${property.propertyPrice}</div>
// 				</Box>
// 				<Box component={'div'} className={'info'}>
// 					<strong className={'title'}>{property.propertyTitle}</strong>
// 					<p className={'desc'}>{property.propertyDesc ?? 'no description'}</p>
// 					<div className={'options'}>
// 						<div>
// 							<img src="/img/icons/bed.svg" alt="" />
// 							<span>{property.propertyBeds} bed</span>
// 						</div>
// 						<div>
// 							<img src="/img/icons/bath.svg" alt="" />
// 							<span>{property.propertyBath} baths</span>
// 						</div>
// 						<div>
// 							<img src="/img/icons/guests.svg" alt="" />
// 							<span>{property.propertyGuests} guests</span>
// 						</div>
// 					</div>
// 					<Divider sx={{ mt: '15px', mb: '17px' }} />
// 					<div className={'bott'}>
// 						<p>
// 							{property.propertyFamily ? 'Family' : ''} {property.propertyFamily && property.propertySeasonal && '/'}{' '}
// 							{property.propertySeasonal ? 'Seasonal' : ''}
// 						</p>
// 						<div className="view-like-box">
// 							<IconButton color={'default'}>
// 								<RemoveRedEyeIcon />
// 							</IconButton>
// 							<Typography className="view-cnt">{property?.propertyViews}</Typography>
// 							<IconButton color={'default'}>
// 								{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
// 									<FavoriteIcon style={{ color: 'red' }} />
// 								) : (
// 									<FavoriteIcon />
// 								)}
// 							</IconButton>
// 							<Typography className="view-cnt">{property?.propertyLikes}</Typography>
// 						</div>
// 					</div>
// 				</Box>
// 			</Stack>
// 		);
// 	} else {
// 		return (
// 			<Stack className="trend-card-box" key={property._id}>
// 				{/* <Box
// 					component={'div'}
// 					className={'card-img'}
// 					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages[0]})` }}
// 				>
// 					<div>${property.propertyPrice} / night</div>
// 				</Box> */}
// 				<div
// 					className="item"
// 					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages[0]})` }}
// 				></div>

// 				{/* <Box component={'div'} className={'info'}>
// 					<strong className={'title'}>{property.propertyTitle}</strong>
// 					<p className={'desc'}>{property.propertyDesc ?? 'no description'}</p>
// 					<div className={'options'}>
// 						<div>
// 							<img src="/img/icons/bed.svg" alt="" />
// 							<span>{property.propertyBeds} bed</span>
// 						</div>
// 						<div>
// 							<img src="/img/icons/bath.svg" alt="" />
// 							<span>{property.propertyBath} baths</span>
// 						</div>
// 						<div>
// 							<img src="/img/icons/guests.svg" alt="" />
// 							<span>{property.propertyGuests} guests</span>
// 						</div>
// 					</div>
// 					<Divider sx={{ mt: '15px', mb: '17px' }} />
// 					<div className={'bott'}>
// 						<p>
// 							{property.propertyFamily ? 'Family' : ''} {property.propertyFamily && property.propertySeasonal && '/'}{' '}
// 							{property.propertySeasonal ? 'Seasonal' : ''}
// 						</p>
// 						<div className="view-like-box">
// 							<IconButton color={'default'}>
// 								<RemoveRedEyeIcon />
// 							</IconButton>
// 							<Typography className="view-cnt">{property?.propertyViews}</Typography>
// 							<IconButton color={'default'}>
// 								{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
// 									<FavoriteIcon style={{ color: 'red' }} />
// 								) : (
// 									<FavoriteIcon />
// 								)}
// 							</IconButton>
// 							<Typography className="view-cnt">{property?.propertyLikes}</Typography>
// 						</div>
// 					</div>
// 				</Box> */}
// 				<div className="content">
// 					<div className="name">Switzerland</div>
// 					<div className="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
// 					<button>See More</button>
// 				</div>
// 			</Stack>
// 		);
// 	}
// };

// export default TrendPropertyCard;
