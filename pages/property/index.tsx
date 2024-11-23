import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Box, Button, Menu, MenuItem, Pagination, Stack, Typography } from '@mui/material';
import PropertyCard from '../../libs/components/property/PropertyCard';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import Filter from '../../libs/components/property/Filter';
import { useRouter } from 'next/router';
import { PropertiesInquiry } from '../../libs/types/property/property.input';
import { Property } from '../../libs/types/property/property';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Direction } from '../../libs/enums/common.enum';
import { GET_PROPERTIES } from '../../apollo/user/query';
import { useQuery } from '@apollo/client';
import { T } from '../../libs/types/common';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const PropertyList: NextPage = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const [searchFilter, setSearchFilter] = useState<PropertiesInquiry>(
		router?.query?.input ? JSON.parse(router?.query?.input as string) : initialInput,
	);
	const [properties, setProperties] = useState<Property[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [sortingOpen, setSortingOpen] = useState(false);
	const [filterSortName, setFilterSortName] = useState('New');

	/** APOLLO REQUESTS **/
	const {
		loading: getProperties,
		data: getPropertiesData,
		error: getPropertiesError,
		refetch: getPropertiesRefetch,
	} = useQuery(GET_PROPERTIES, {
		fetchPolicy: 'network-only',
		variables: { input: searchFilter },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setProperties(data?.getProperties?.list);
			setTotal(data?.getProperties?.metaCounter[0]?.total);
		},
	});

	/** LIFECYCLES **/
	useEffect(() => {
		if (router.query.input) {
			const inputObj = JSON.parse(router?.query?.input as string);
			setSearchFilter(inputObj);
		}

		setCurrentPage(searchFilter.page === undefined ? 1 : searchFilter.page);
	}, [router]);

	useEffect(() => {}, [searchFilter]);

	/** HANDLERS **/
	const handlePaginationChange = async (event: ChangeEvent<unknown>, value: number) => {
		searchFilter.page = value;
		await router.push(
			`/property?input=${JSON.stringify(searchFilter)}`,
			`/property?input=${JSON.stringify(searchFilter)}`,
			{
				scroll: false,
			},
		);
		setCurrentPage(value);
	};

	const sortingClickHandler = (e: MouseEvent<HTMLElement>) => {
		setAnchorEl(e.currentTarget);
		setSortingOpen(true);
	};

	const sortingCloseHandler = () => {
		setSortingOpen(false);
		setAnchorEl(null);
	};

	const sortingHandler = (e: React.MouseEvent<HTMLLIElement>) => {
		switch (e.currentTarget.id) {
			case 'new':
				setSearchFilter({ ...searchFilter, sort: 'createdAt', direction: Direction.ASC });
				setFilterSortName('New');
				break;
			case 'lowest':
				setSearchFilter({ ...searchFilter, sort: 'propertyPrice', direction: Direction.ASC });
				setFilterSortName('Lowest Price');
				break;
			case 'highest':
				setSearchFilter({ ...searchFilter, sort: 'propertyPrice', direction: Direction.DESC });
				setFilterSortName('Highest Price');
		}
		setSortingOpen(false);
		setAnchorEl(null);
	};

	if (device === 'mobile') {
		return <h1>PROPERTIES MOBILE</h1>;
	} else {
		return (
			<div id="property-list-page" style={{ position: 'relative' }}>
				<div className="container">
					<Stack component={'div'} className={'right'}>
						<Box component={'div'} className={'sort'}>
							<span>Sort by</span>
							<div>
								<Button onClick={sortingClickHandler} endIcon={<KeyboardArrowDownRoundedIcon />}>
									{filterSortName}
								</Button>
								<Menu anchorEl={anchorEl} open={sortingOpen} onClose={sortingCloseHandler} sx={{ paddingTop: '5px' }}>
									<MenuItem
										onClick={sortingHandler}
										id={'new'}
										disableRipple
										sx={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
									>
										New
									</MenuItem>
									<MenuItem
										onClick={sortingHandler}
										id={'lowest'}
										disableRipple
										sx={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
									>
										Lowest Price
									</MenuItem>
									<MenuItem
										onClick={sortingHandler}
										id={'highest'}
										disableRipple
										sx={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
									>
										Highest Price
									</MenuItem>
								</Menu>
							</div>
						</Box>
						<Box component={'div'} className={'input-wrapper'}>
							<input className={'search-input'} type="search" placeholder="Find a destination..." />
							<button className={'search-btn'} type="submit">
								<img src="/img/icons//searchWhite.svg" alt="" />
							</button>
						</Box>
						<Box component={'div'} className="filter-wrapper">
							<button className={'filter-btn'}>
								<img className={'filter-icon'} src="/img/icons/filter.svg" alt="" />
							</button>
						</Box>
					</Stack>
					<div className="product-page-top">
						<div className="top-btn-wrapper">
							<button className={'top-btn'}>
								<img className={'top-btn-icon'} src="/img/icons/propertTypes/parks.svg" alt="" />
								<span className={'top-btn-txt'}>Parks</span>
							</button>
						</div>
						<div className="top-btn-wrapper">
							<button className="top-btn">
								<img className={'top-btn-icon'} src="/img/icons/propertTypes/countryside.svg" alt="" />
								<span className={'top-btn-txt'}>Countryside</span>
							</button>
						</div>
						<div className="top-btn-wrapper">
							<button className="top-btn">
								<img className={'top-btn-icon'} src="/img/icons/propertTypes/hanoks.svg" alt="" />
								<span className={'top-btn-txt'}>Hanok</span>
							</button>
						</div>
						<div className="top-btn-wrapper">
							<button className="top-btn">
								<img className={'top-btn-icon'} src="/img/icons/propertTypes/lake.svg" alt="" />
								<span className={'top-btn-txt'}>Lake</span>
							</button>
						</div>
						<div className="top-btn-wrapper">
							<button className="top-btn">
								<img className={'top-btn-icon'} src="/img/icons/propertTypes/skiing.svg" alt="" />
								<span className={'top-btn-txt'}>Skiing</span>
							</button>
						</div>
						<div className="top-btn-wrapper">
							<button className="top-btn">
								<img className={'top-btn-icon'} src="/img/icons/propertTypes/farms.svg" alt="" />
								<span className={'top-btn-txt'}>Farm</span>
							</button>
						</div>
						<div className="top-btn-wrapper">
							<button className="top-btn">
								<img className={'top-btn-icon'} src="/img/icons/propertTypes/pool.svg" alt="" />
								<span className={'top-btn-txt'}>Pool</span>
							</button>
						</div>
						<div className="top-btn-wrapper">
							<button className="top-btn">
								<img className={'top-btn-icon'} src="/img/icons/propertTypes/camping.svg" alt="" />
								<span className={'top-btn-txt'}>Camping</span>
							</button>
						</div>
						<div className="top-btn-wrapper">
							<button className="top-btn">
								<img className={'top-btn-icon'} src="/img/icons/propertTypes/play.svg" alt="" />
								<span className={'top-btn-txt'}>Play</span>
							</button>
						</div>
						<div className="top-btn-wrapper">
							<button className="top-btn">
								<img className={'top-btn-icon'} src="/img/icons/propertTypes/luxe.svg" alt="" />
								<span className={'top-btn-txt'}>Luxe</span>
							</button>
						</div>
					</div>

					<Stack className={'property-page'}>
						<Stack className={'filter-config'}>
							{/* @ts-ignore */}
							<Filter searchFilter={searchFilter} setSearchFilter={setSearchFilter} initialInput={initialInput} />
						</Stack>
						<Stack className="main-config" mb={'76px'}>
							<Stack className={'list-config'}>
								{properties?.length === 0 ? (
									<div className={'no-data'}>
										<img src="/img/icons/icoAlert.svg" alt="" />
										<p>No Properties found!</p>
									</div>
								) : (
									properties.map((property: Property) => {
										return <PropertyCard property={property} key={property?._id} />;
									})
								)}
							</Stack>
							<Stack className="pagination-config">
								{properties.length !== 0 && (
									<Stack className="pagination-box">
										<Pagination
											page={currentPage}
											count={Math.ceil(total / searchFilter.limit)}
											onChange={handlePaginationChange}
											shape="circular"
											color="primary"
										/>
									</Stack>
								)}

								{properties.length !== 0 && (
									<Stack className="total-result">
										<Typography>
											Total {total} propert{total > 1 ? 'ies' : 'y'} available
										</Typography>
									</Stack>
								)}
							</Stack>
						</Stack>
					</Stack>
				</div>
			</div>
		);
	}
};

PropertyList.defaultProps = {
	initialInput: {
		page: 1,
		limit: 9,
		sort: 'createdAt',
		direction: 'DESC',
		search: {
			guestsRange: {
				start: 0,
				end: 10,
			},
			pricesRange: {
				start: 0,
				end: 2000000,
			},
		},
	},
};

export default withLayoutBasic(PropertyList);
