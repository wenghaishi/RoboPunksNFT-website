import React, { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import roboPunksNFT from './RoboPunksNFT.json';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';

const roboPunksNFTAddress = "0xeEe204F6548F36E4ce810c087F514593b56747D5";

const MainMint = ({ accounts, setAccounts}) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                roboPunksNFTAddress,
                roboPunksNFT.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
                });
                console.log('response: ', response);
            }   catch (err) {
                console.log("error: ", err)
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    };

    return (
        <Flex justify="center" align="center" height="90vh" paddingBottom="200px">
            <Box width="500px">
                <div>
                    <Text fontSize="90px" textShadow="0 5px #000000">RoboPunks</Text>
                    <Text
                        fontSize="42px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000"
                    >
                      It's 2069. Can the Robopunks save humans from destructive rampant NFT speculations? Mint RoboPunks to find out.  
                    </Text>
                </div>
            {isConnected ? (
                <div>
                    <Flex align="center" justify="center">
                        <Button
                            backgroundColor="#D6517D"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0f0f0f"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            fontSize="30"
                            padding="15px"
                            margin="5px"
                            onClick={handleDecrement}
                        >
                            -
                        </Button>
                        <Input 
                            readOnly
                            justify="center"
                            fontSize="36"
                            fontFamily="inherit"
                            width="100px"
                            height="40px"
                            textAlign="center"
                            paddingLeft="19px"
                            marginTop="10px"
                            type="number"
                            value={mintAmount} 
                        />
                        <Button
                            backgroundColor="#D6517D"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0f0f0f"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit" 
                            fontSize="30"
                            padding="15px"
                            margin="5px"
                            onClick={handleIncrement}
                        >
                            +
                        </Button>
                    </Flex>
                    <Button
                        backgroundColor="#D6517D"
                        borderRadius="10px"
                        boxShadow="0px 2px 2px 1px #0f0f0f"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherit"
                        fontSize="26"
                        padding="20px"
                        margin="20px"
                        onClick={handleMint}
                    >
                        Mint Now
                    </Button>
                </div>
            ) : (
                <Text
                    fontSize="32px"
                    letterSpacing="-5.5%"
                    fontFamily="VT323"
                    textShadow="0 2px 2px #000000"
                    color="#D6517D"
                >
                        You must be connected to mint.
                </Text>
            )}
        </Box>
    </Flex>
    );
};


export default MainMint;