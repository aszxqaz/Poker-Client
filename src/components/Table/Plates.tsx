// import { Grid } from '@chakra-ui/react'
// import { CashTable, RoundPlayer } from '../../api/response-types'
// import { ICard, IPlayer } from '../../types'
// import { Card } from './Card'
// import { Plate } from './Plate'

// type PlatesProps = {
//   players: RoundPlayer[]
//   heroUsername: string
//   cards: ICard[]
// }

// export const Plates: React.FC<PlatesProps> = ({ players, heroUsername, cards }) => {
//   return (
//     <>
//       {players.map((player, i) => {
//         const pos = POSITIONS[(players.length - 1) as keyof typeof POSITIONS][i]
//         return (
//           <Plate
//             key={player.username}
//             opacity={player.done ? 0.4 : 1}
//             player={player}
//             pos="absolute"
//             {...pos}
//             // transform="translate(-50%, -50%)"
//             reversed={'reversed' in pos && pos.reversed}
//           >
//             {heroUsername === player.username && cards ? (
//               <Grid
//                 pos="absolute"
//                 top="110%"
//                 left="50%"
//                 transform="translateX(-50%)"
//                 m="auto"
//                 mt="2vh"
//                 w="22vh"
//                 columnGap="0.7vh"
//                 templateColumns="1fr 1fr"
//                 alignItems="center"
//               >
//                 {cards.map(card => (
//                   <Card card={card} size="lg" />
//                 ))}
//               </Grid>
//             ) : null}
//           </Plate>
//         )
//       })}
//     </>
//   )
// }

export const a =0