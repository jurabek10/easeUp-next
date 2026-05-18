import React from 'react';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import { Member } from '../../types/member/member';
import { REACT_APP_API_URL } from '../../config';

interface TopAgentProps {
	agent: Member;
}

const TopAgentCard = (props: TopAgentProps) => {
	const { agent } = props;
	const router = useRouter();
	const agentImage = agent?.memberImage
		? `${REACT_APP_API_URL}/${agent?.memberImage}`
		: '/img/profile/defaultUser.svg';

	const pushAgentDetail = () => {
		if (!agent?._id) return;
		router.push({ pathname: '/agent/detail', query: { agentId: agent._id } });
	};

	return (
		<Stack className="top-agent-card" onClick={pushAgentDetail}>
			<div className="agent-photo">
				<img src={agentImage} alt={agent?.memberNick} />
				<div className="photo-overlay">
					<span>View Profile</span>
				</div>
			</div>
			<div className="agent-info">
				<strong className="agent-name">{agent?.memberNick}</strong>
				<span className="agent-role">{agent?.memberType}</span>
			</div>
		</Stack>
	);
};

export default TopAgentCard;
