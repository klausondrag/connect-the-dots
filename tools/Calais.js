const request = require('request');

const token = require('./keys.json').CALAIS_TOKEN;

function submitInfoRequest(inputData) {
    return new Promise((resolve, reject) => {
        request({
                method: 'POST',
                dataType: "text",
                headers: {'X-AG-Access-Token': token, 'Content-Type': 'text/raw', 'OutputFormat': 'application/json'},
                json: inputData,//"IBM is a company in the USA",
                uri: "https://api.thomsonreuters.com/permid/calais?access-token=" + token,

            },
            function (error, response) {
                if (error) {
                    console.error('Error: ', error);
                    reject(error);
                } else {
                    resolve(response.body);
                }
            });
    });
}

submitInfoRequest(getInputData1()).then(collectInfo)
    .then(dic1 => {
        console.log("dic1:", dic1);
        submitInfoRequest(getInputData2()).then(collectInfo)
            .then(dic2 => {
                console.log("dic2:", dic2);


            })
    });

function collectInfo(result) {
    let dic = {};
    for (let p in result) {
        if (result.hasOwnProperty(p)) {
            if (p === "doc" || !result[p]._type) continue;
            let {name, relevance} = result[p];
            if (name && relevance) {
                if (!dic[result[p]._type]) dic[result[p]._type] = [];
                dic[result[p]._type].push([name, relevance]);
            }
        }
    }
    return dic;
}


function getInputData1() {
    return "North Korea says seeking military 'equilibrium' with U.S.\n" +
        "\n" +
        "SEOUL/UNITED NATIONS (Reuters) - North Korea said on Saturday it aims to reach an “equilibrium” of military force with the United States, which earlier signalled its patience for diplomacy is wearing thin after Pyongyang fired a missile over Japan for the second time in under a month.\n" +
        "\n" +
        "“Our final goal is to establish the equilibrium of real force with the U.S. and make the U.S. rulers dare not talk about military option,” North Korean leader Kim Jong Un was quoted as saying by the state news agency, KCNA.\n" +
        "\n" +
        "Kim was shown beaming as he watched the missile fly from a moving launcher in photos released by the agency, surrounded by several officials.\n" +
        "\n" +
        "“The combat efficiency and reliability of Hwasong-12 were thoroughly verified,” said Kim as quoted by KCNA. Kim added the North’s goal of completing its nuclear force had “nearly reached the terminal”.\n" +
        "\n" +
        "North Korea has launched dozens of missiles under Kim’s leadership as it accelerates a weapons program designed to give it the ability to target the United States with a powerful, nuclear-tipped missile.\n" +
        "\n" +
        "(For a graphic on North Korea's missile and nuclear tests, click tmsnrt.rs/2f3Y8rQ)\n" +
        "\n" +
        "After the latest missile launch on Friday, White House National Security Adviser H.R. McMaster said the United States was fast running out of patience with North Korea’s missile and nuclear programs.\n" +
        "\n" +
        "“We’ve been kicking the can down the road, and we’re out of road,” McMaster told reporters, referring to Pyongyang’s repeated missile tests in defiance of international pressure.\n" +
        "\n" +
        "“For those ... who have been commenting on a lack of a military option, there is a military option,” he said, adding that it would not be the Trump administration’s preferred choice.\n" +
        "\n" +
        "Also on Friday, the U.N. Security Council condemned the “highly provocative” missile launch by North Korea.\n" +
        "\n" +
        "It had already stepped up sanctions against North Korea in response to a nuclear bomb test on Sept. 3, imposing a ban on North Korea’s textile exports and capping its imports of crude oil. \n" +
        "The U.S. ambassador to the United Nations, Nikki Haley, echoed McMaster’s strong rhetoric, even as she said Washington’s preferred resolution to the crisis is through diplomacy and sanctions.\n" +
        "\n" +
        "“What we are seeing is, they are continuing to be provocative, they are continuing to be reckless and at that point there’s not a whole lot the Security Council is going to be able to do from here, when you’ve cut 90 percent of the trade and 30 percent of the oil,” Haley said.\n" +
        "\n" +
        "U.S. President Donald Trump said that he is “more confident than ever that our options in addressing this threat are both effective and overwhelming.” He said at Joint Base Andrews near Washington that North Korea “has once again shown its utter contempt for its neighbours and for the entire world community.”\n" +
        "MISSILE\n" +
        "\n" +
        "North Korea’s latest test missile flew over Hokkaido in northern Japan on Friday and landed in the Pacific about 2,000 km (1,240 miles) to the east, the Japanese government said.\n" +
        "\n" +
        "It travelled about 3,700 km (2,300 miles) in total, according to South Korea’s military, far enough to reach the U.S. Pacific territory of Guam, which the North has threatened before. \n" +
        "\n" +
        "“The range of this test was significant since North Korea demonstrated that it could reach Guam with this missile,” the Union of Concerned Scientists advocacy group said in a statement. However, the accuracy of the missile, still at an early stage of development, was low, it said.\n" +
        "\n" +
        "On Thursday, U.S. Secretary of State Tillerson called on China, Pyongyang’s only ally, and Russia to apply more pressure on North Korea by “taking direct actions of their own.”\n" +
        "\n" +
        "Beijing has pushed back, urging Washington to do more to rein in North Korea.\n" +
        "\n" +
        "“Honestly, I think the United States should be doing .. much more than now, so that there’s real effective international cooperation on this issue,” China’s ambassador to the United States, Cui Tiankai, said on Friday.\n" +
        "\n" +
        "“They should refrain from issuing more threats. They should do more to find effective ways to resume dialogue and negotiation,” he said, while adding that China would never accept North Korea as a nuclear weapons state.\n" +
        "\n" +
        "North Korea staged its sixth and most powerful nuclear bomb test earlier this month and in July tested long-range intercontinental ballistic missiles capable of reaching at least parts of the U.S. mainland.\n" +
        "\n" +
        "Last month, North Korea fired an intermediate range missile that also flew over Hokkaido into the ocean.\n" +
        "\n" +
        "Warning announcements about the latest missile blared in parts of northern Japan, while many residents received alerts on their mobile phones or saw warnings on TV telling them to seek refuge.\n" +
        "\n" +
        "The U.S. military said it had detected a single intermediate range ballistic missile but it did not pose a threat to North America or Guam.\n" +
        "\n" +
        "Global equities investors largely shrugged off the latest missile test by North Korea as shares on Wall Street set new highs on Friday.\n" +
        "DIFFERENCES OVER DIRECT TALKS\n" +
        "\n" +
        "Trump has promised not to allow North Korea to threaten the United States with a nuclear-tipped missile.\n" +
        "\n" +
        "Russia’s U.N. ambassador, Vassily Nebenzia, said the United States needed to begin talks with North Korea, something that Washington has so far ruled out.\n" +
        "\n" +
        "“We called on our U.S. partners and others to implement political and diplomatic solutions that are provided for in the resolution,” Nebenzia told reporters after the Security Council meeting. “Without implementing this, we also will consider it as a non-compliance with the resolution.”\n" +
        "\n" +
        "Asked about the prospect for direct talks, a White House spokesman said, “As the president and his national security team have repeatedly said, now is not the time to talk to North Korea.”\n" +
        "\n" +
        "South Korean President Moon Jae-in also said dialogue with the North was impossible at this point. He ordered officials to analyse and prepare for possible new North Korean threats, including electromagnetic pulse and biochemical attacks.\n" +
        "\n" +
        "The United States and South Korea are technically still at war with North Korea because the 1950-53 Korean conflict ended with a truce and not a peace treaty. The North accuses the United States, which has 28,500 troops in South Korea, of planning to invade and regularly threatens to destroy it and its Asian allies.";
}

function getInputData2() {
    return "Detectives hunting for the Parsons Green bomber have arrested an 18-year-old man in the port of Dover, Kent.\n" +
        "\n" +
        "Investigators believe the suspect may have been in the port area of Dover to try and board a ferry to leave Britain, the Guardian has learned.\n" +
        "\n" +
        "Islamic State is believed to have identified security at Dover and on ferries as weak, and the group have previously used the port to get people in and out of Britain.\n" +
        "\n" +
        "Police described the arrest as significant, and there was confidence among counter-terrorism officials that finding and detaining the suspect represented a major breakthrough in the investigation.\n" +
        "\n" +
        "The Metropolitan police said Kent police had arrested the man in the port area of Dover on Saturday morning under section 41 of the Terrorism Act. The law allows a police officer to arrest someone whom they reasonably suspect to be a terrorist.\n" +
        "\n" +
        "The man was taken to a local police station and will be driven under guard to a south London police station.\n" +
        "\n" +
        "The arrest came 24 hours after a homemade bomb partially exploded at Parson Green tube station in west London, injuring 29 people. The attack during Friday’s morning rush hour led to Britain’s terrorism threat level being raised to its maximum for fear a further attack could be imminent.\n" +
        "\n" +
        "Police and security services believe the improvised explosive device (IED) that partially detonated at about 8.20am on Friday was intended to kill. \n" +
        "\n" +
        "It was detonated by a timer, but unlike in previous bombings, the timing device was not a mobile phone. The IED at Parsons Green contained fairy lights, which may have been used as an initiator that was meant to set off the main explosive charge.\n" +
        "\n" +
        "The UK’s terrorism threat level is being reviewed “hour by hour” as developments in the investigation unfold, sources say. The Joint Terrorism Analysis Centre’s decision to raise the threat level to its highest level was based on fears that whoever was behind the attack, and the materials used to make the device, were unaccounted for.\n" +
        "\n" +
        "The JTAC will now assess whether the Dover arrest alleviates these concerns. .\n" +
        "\n" +
        "Deputy assistant commissioner Neil Basu, the senior national co-ordinator for counter-terrorism policing, said: “We have made a significant arrest in our investigation this morning. Although we are pleased with the progress made, this investigation continues and the threat level remains at critical.\n" +
        "\n" +
        "“The public should remain vigilant as our staff, officers and partners continue to work through this complex investigation. We are not, at this time, changing our protective security measures and the steps taken to free up extra armed officers remain in place.\n" +
        "\n" +
        "“This arrest will lead to more activity from our officers. For strong investigative reasons we will not give any more details on the man we arrested at this stage.”\n" +
        "\n" +
        "The motivation for the attack on morning rush hour commuters is believed by counter-terrorism investigators to be jihadi.Isis has claimed responsibility, but they have done so after other attacks that they had nothing to do with.\n" +
        "\n" +
        "Saturday morning’s arrest is significant, but investigators are keeping an open mind as to whether anyone else was involved in placing the bomb on the tube train at Parsons Green, or helping to make it.\n" +
        "\n" +
        "Investigations will continue and questions about whether there were other conspirators will be put to the Dover detainee.\n" +
        "\n" +
        "Detectives will also scour reams of CCTV footage they have secured from before and after the attack in an effort to track the movements of those they suspect of involvement.\n" +
        "\n" +
        "Any computer and phone owned by a suspect will be examined and the remnants of the IED may also provide forensic clues.\n" +
        "\n" +
        "Parsons Green station reopened in the early hours of Saturday, shortly after the terror threat was raised to its highest level.\n" +
        "\n" +
        "It is the second time this year the country has been placed on critical alert. The other occasion was after the Manchester Arena bombing that killed 22 people in May.\n" +
        "\n" +
        "Authorities have said the number of people hurt on Friday could have been much higher, with the potential for fatalities and life-threatening injuries, had the bomb, which was concealed within a supermarket carrier bag, fully exploded.\n" +
        "\n" +
        "It is not yet known whether the device, which was reportedly fitted with a timer, went off at its intended target.\n" +
        "\n" +
        "The train, which was bound for Edgware Road, was pulling into the station in south-west London when the bomb detonated in the rear carriage, sending passengers fleeing for safety.";
}
