import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useRouter, withRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { getJwtToken, logOut, updateUserInfo } from '../auth';
import { Stack, Box, Drawer, IconButton, Divider } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { CaretDown, List as BurgerIcon, X as CloseIcon } from 'phosphor-react';
import Link from 'next/link';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../apollo/store';
import { Logout } from '@mui/icons-material';
import { REACT_APP_API_URL } from '../config';
import NotifacationModal from './common/NotificationModal';
import NotificationBadge from './common/NotificationBadge';

const Top = () => {
	const user = useReactiveVar(userVar);
	const { t, i18n } = useTranslation('common');
	const router = useRouter();
	const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
	const [lang, setLang] = useState<string | null>('en');
	const drop = Boolean(anchorEl2);
	const [colorChange, setColorChange] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<any | HTMLElement>(null);
	let open = Boolean(anchorEl);
	const [bgColor, setBgColor] = useState<boolean>(false);
	const [logoutAnchor, setLogoutAnchor] = React.useState<null | HTMLElement>(null);
	const logoutOpen = Boolean(logoutAnchor);
	const [isNotifModalOpen, setNotifModalOpen] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

	/** LIFECYCLES **/
	useEffect(() => {
		if (localStorage.getItem('locale') === null) {
			localStorage.setItem('locale', 'en');
			setLang('en');
		} else {
			setLang(localStorage.getItem('locale'));
		}
	}, [router]);

	useEffect(() => {
		switch (router.pathname) {
			case '/property/detail':
				setBgColor(true);
				break;
			default:
				break;
		}
	}, [router]);

	useEffect(() => {
		const jwt = getJwtToken();
		if (jwt) updateUserInfo(jwt);
	}, []);

	useEffect(() => {
		setMobileMenuOpen(false);
	}, [router.asPath]);

	/** HANDLERS **/
	const langClick = (e: any) => {
		setAnchorEl2(e.currentTarget);
	};

	const langClose = () => {
		setAnchorEl2(null);
	};

	const langChoice = useCallback(
		async (e: any) => {
			setLang(e.target.id);
			localStorage.setItem('locale', e.target.id);
			setAnchorEl2(null);
			await router.push(router.asPath, router.asPath, { locale: e.target.id });
		},
		[router],
	);

	const changeNavbarColor = () => {
		if (window.scrollY >= 50) {
			setColorChange(true);
		} else {
			setColorChange(false);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleHover = (event: any) => {
		if (anchorEl !== event.currentTarget) {
			setAnchorEl(event.currentTarget);
		} else {
			setAnchorEl(null);
		}
	};

	const toggleNotificationModal = () => {
		setNotifModalOpen((prev) => !prev);
	};

	const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
	const closeMobileMenu = () => setMobileMenuOpen(false);

	const StyledMenu = styled((props: MenuProps) => (
		<Menu
			elevation={0}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			{...props}
		/>
	))(({ theme }) => ({
		'& .MuiPaper-root': {
			top: '109px',
			borderRadius: 6,
			marginTop: theme.spacing(1),
			minWidth: 160,
			color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
			boxShadow:
				'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
			'& .MuiMenu-list': {
				padding: '4px 0',
			},
			'& .MuiMenuItem-root': {
				'& .MuiSvgIcon-root': {
					fontSize: 18,
					color: theme.palette.text.secondary,
					marginRight: theme.spacing(1.5),
				},
				'&:active': {
					backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
				},
			},
		},
	}));

	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', changeNavbarColor);
	}

	const navLinks = [
		{ href: '/', label: t('Home') },
		{ href: '/property', label: t('Destinations') },
		{ href: '/agent', label: t('Agents') },
		{ href: '/community?articleCategory=FREE', label: t('Community') },
		...(user?._id ? [{ href: '/mypage', label: t('My Page') }] : []),
		{ href: '/cs', label: t('CS') },
	];

	return (
		<Stack className={'navbar'}>
			<Stack className={`navbar-main ${colorChange ? 'transparent' : ''} ${bgColor ? 'transparent' : ''}`}>
				<Stack className={'container'}>
					<Box component={'div'} className={'logo-box'}>
						<Link href={'/'}>
							<img src="/img/logo/logo.svg" alt="" />
						</Link>
						<Link href={'/'}>
							<div className="logo-text">EaseUp</div>
						</Link>
					</Box>
					<Box component={'div'} className={'router-box'}>
						{navLinks.map((link) => (
							<Link href={link.href} key={link.href}>
								<div>{link.label}</div>
							</Link>
						))}
					</Box>
					<Box component={'div'} className={'user-box'}>
						{user?._id ? (
							<>
								<div className={'login-user'} onClick={(event: any) => setLogoutAnchor(event.currentTarget)}>
									<img
										src={
											user?.memberImage ? `${REACT_APP_API_URL}/${user?.memberImage}` : '/img/profile/defaultUser.svg'
										}
										alt=""
									/>
								</div>

								<Menu
									id="basic-menu"
									anchorEl={logoutAnchor}
									open={logoutOpen}
									onClose={() => {
										setLogoutAnchor(null);
									}}
									sx={{ mt: '5px' }}
								>
									<MenuItem onClick={() => logOut()}>
										<Logout fontSize="small" style={{ color: 'blue', marginRight: '10px' }} />
										Logout
									</MenuItem>
								</Menu>
							</>
						) : (
							<Link href={'/account/join'}>
								<div className={'join-box'}>
									<AccountCircleOutlinedIcon style={{ color: '#f97316' }} />
									<span>
										{t('Login')} / {t('Register')}
									</span>
								</div>
							</Link>
						)}

						<div className={'lan-box'}>
							{user?._id && (
								<>
									<Button>
										<NotificationsOutlinedIcon onClick={toggleNotificationModal} className={'notification-icon'} />
									</Button>
								</>
							)}

							<Button
								disableRipple
								className="btn-lang"
								onClick={langClick}
								endIcon={<CaretDown size={14} color="#ffffff" weight="fill" />}
							>
								<Box component={'div'} className={'flag'}>
									{lang !== null ? (
										<img src={`/img/flag/lang${lang}.png`} alt={'usaFlag'} />
									) : (
										<img src={`/img/flag/langen.png`} alt={'usaFlag'} />
									)}
								</Box>
							</Button>

							<StyledMenu anchorEl={anchorEl2} open={drop} onClose={langClose} sx={{ position: 'absolute' }}>
								<MenuItem disableRipple onClick={langChoice} id="en">
									<img
										className="img-flag"
										src={'/img/flag/langen.png'}
										onClick={langChoice}
										id="en"
										alt={'usaFlag'}
									/>
									{t('English')}
								</MenuItem>
								<MenuItem disableRipple onClick={langChoice} id="kr">
									<img
										className="img-flag"
										src={'/img/flag/langkr.png'}
										onClick={langChoice}
										id="uz"
										alt={'koreanFlag'}
									/>
									{t('Korean')}
								</MenuItem>
								<MenuItem disableRipple onClick={langChoice} id="ru">
									<img
										className="img-flag"
										src={'/img/flag/langru.png'}
										onClick={langChoice}
										id="ru"
										alt={'russiaFlag'}
									/>
									{t('Russian')}
								</MenuItem>
							</StyledMenu>
						</div>
					</Box>

					<IconButton
						className={'burger-btn'}
						onClick={toggleMobileMenu}
						aria-label={'Open menu'}
						size={'large'}
					>
						<BurgerIcon size={28} color="#ffffff" weight="bold" />
					</IconButton>

					{user?._id ? (
						<>
							<div style={{ position: 'absolute', top: 80, right: 0 }}>
								<NotificationBadge />
							</div>
							{isNotifModalOpen && (
								<div style={{ position: 'absolute', top: 80, right: 0 }}>
									<NotifacationModal />
								</div>
							)}
						</>
					) : null}
				</Stack>
			</Stack>

			<Drawer
				anchor={'right'}
				open={mobileMenuOpen}
				onClose={closeMobileMenu}
				PaperProps={{ className: 'mobile-drawer-paper' }}
				ModalProps={{ keepMounted: true }}
			>
				<div className={'mobile-drawer'}>
					<div className={'drawer-header'}>
						<div className={'drawer-logo'}>
							<img src="/img/logo/logo.svg" alt="" />
							<span>EaseUp</span>
						</div>
						<IconButton onClick={closeMobileMenu} aria-label={'Close menu'} size={'large'}>
							<CloseIcon size={24} color="#181a20" weight="bold" />
						</IconButton>
					</div>

					<Divider />

					<div className={'drawer-links'}>
						{navLinks.map((link) => (
							<Link href={link.href} key={link.href} onClick={closeMobileMenu}>
								<div className={'drawer-link'}>{link.label}</div>
							</Link>
						))}
					</div>

					<Divider />

					<div className={'drawer-actions'}>
						{user?._id ? (
							<div className={'drawer-user'}>
								<img
									src={user?.memberImage ? `${REACT_APP_API_URL}/${user?.memberImage}` : '/img/profile/defaultUser.svg'}
									alt=""
								/>
								<button
									className={'drawer-logout'}
									onClick={() => {
										logOut();
										closeMobileMenu();
									}}
								>
									<Logout fontSize="small" style={{ marginRight: 8 }} />
									{t('Logout')}
								</button>
							</div>
						) : (
							<Link href={'/account/join'} onClick={closeMobileMenu}>
								<div className={'drawer-join'}>
									<AccountCircleOutlinedIcon style={{ color: '#ffffff' }} />
									<span>
										{t('Login')} / {t('Register')}
									</span>
								</div>
							</Link>
						)}

						<div className={'drawer-langs'}>
							{(['en', 'kr', 'ru'] as const).map((code) => (
								<button
									key={code}
									className={`drawer-lang ${lang === code ? 'active' : ''}`}
									onClick={async () => {
										setLang(code);
										localStorage.setItem('locale', code);
										await router.push(router.asPath, router.asPath, { locale: code });
										closeMobileMenu();
									}}
								>
									<img src={`/img/flag/lang${code}.png`} alt={code} />
									<span>{code === 'en' ? t('English') : code === 'kr' ? t('Korean') : t('Russian')}</span>
								</button>
							))}
						</div>
					</div>
				</div>
			</Drawer>
		</Stack>
	);
};

export default withRouter(Top);
