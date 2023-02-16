import { ApolloClient, InMemoryCache, gql } from "@apollo/client"
import Image from "next/image"
import Link from "next/link"
import { FcInfo } from "react-icons/fc"

console.log(process.env.GRAFBASE_API_URL)
async function getLaunches() {
	const client = new ApolloClient({
		uri: process.env.GRAFBASE_API_URL,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: gql`
			query ExampleQuery {
				launchesPast(limit: 20) {
					id
					mission_name
					rocket {
						rocket_name
						rocket_type
					}
					links {
						flickr_images
						wikipedia
					}
					details
					launch_date_local
				}
			}
		`,
	})

	return data.launchesPast
}

export default async function Home() {
	const launches = await getLaunches()

	return (
		<main className='grid gap-4 grid-cols-3 grid-rows-3'>
			{launches.map((launch) => {
				return (
					<div
						key={launch.id}
						className='bg-indigo-400 rounded-sm text-white p-4 flex flex-col gap-4'
					>
						<div className='info'>
							<h3 className='font-bold'>
								Mission {launch.mission_name}
							</h3>
							<small>{launch.launch_date_local}</small>

							<p>
								<span className='font-bold'>Rocket Name</span>{" "}
								{launch.rocket.rocket_name}
								<i>
									<Link
										href={launch.links.wikipedia || ""}
										target='_blank'
									>
										<FcInfo className='text-xl' />
									</Link>
								</i>
							</p>
						</div>

						{launch.links.flickr_images[0] ? (
							<Image
								width='300'
								height='300'
								alt='Rocket'
								src={launch.links.flickr_images[0]}
							/>
						) : null}
					</div>
				)
			})}
		</main>
	)
}
