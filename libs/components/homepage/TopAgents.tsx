import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Stack, Box } from '@mui/material';
import TopAgentCard from './TopAgentCard';
import { Member } from '../../types/member/member';
import { AgentsInquiry } from '../../types/member/member.input';
import { useQuery } from '@apollo/client';
import { GET_AGENTS } from '../../../apollo/user/query';
import { T } from '../../types/common';
import Link from 'next/link';

interface TopAgentsProps {
	initialInput: AgentsInquiry;
}

const TopAgents = (props: TopAgentsProps) => {
	const { initialInput } = props;
	const router = useRouter();
	const [topAgents, setTopAgents] = useState<Member[]>([]);

	useQuery(GET_AGENTS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setTopAgents(data?.getAgents?.list);
		},
	});

	return (
		<Stack className={'top-agents'}>
			<Stack className={'container'}>
				<Stack className={'info-box'}>
					<Box component={'div'} className={'left'}>
						<span>Top Agents</span>
						<p>Our Top Agents always ready to serve you</p>
					</Box>
					<Box component={'div'} className={'right'}>
						<div className={'more-box'}>
							<Link href={'/agent'}>
								<span>See All Agents</span>
							</Link>
							<img src="/img/icons/rightup.svg" alt="" />
						</div>
					</Box>
				</Stack>
				<Stack className={'wrapper'}>
					{topAgents.map((agent: Member) => (
						<TopAgentCard agent={agent} key={agent?._id ?? agent?.memberNick} />
					))}
				</Stack>
			</Stack>
		</Stack>
	);
};

TopAgents.defaultProps = {
	initialInput: {
		page: 1,
		limit: 6,
		sort: 'memberRank',
		direction: 'DESC',
		search: {},
	},
};

export default TopAgents;
