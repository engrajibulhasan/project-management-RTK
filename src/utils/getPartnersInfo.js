const getPartnersInfo = (email, participants) => {
    return participants.find(participant => participant.email !== email)
}

export default getPartnersInfo;