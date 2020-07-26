const translations = {
  homepage_title: `Online Hearing Experiment`,
  homepage_description: `<p>Hello,</p>
      <p>You are about to start an online experiment on hearing organized by Arnaud Norena, director of research at the CNRS (Sensory and Cognitive Neuroscience Laboratory, Marseille, France). For any further information, you can contact Arnaud by <a class="ui label" href="mailto:arnaud.norena@univ-amu.fr"><i class="mail icon"></i> email</a>.</p>
      <p><strong>First of all, we would like to thank you for your participation!</strong></p>
      <p>You will not be asked for any identifying information. Make sure that you can perform the experiment in good conditions: have time to go until the end (about 20 minutes), be motivated and in good shape, and be in a quiet place.</p>
      <p>The test consists of evaluating sounds according to a visual scale ranging from very pleasant to very unpleasant:</p>
      <ul>
        <li>If the sound presented is a dog barking and you find this sound very unpleasant, then you should click on the right end of the scale.</li>
        <li>If the sound presented is wind in the forest and you find this sound very pleasant, then you should click on the left end of the scale.</li>
        <li>If the sound presented is neutral, you must click in the middle of the scale.</li>
      </ul>
      <p>In general, the sounds are more or less pleasant or unpleasant, so you must use the full length of the scale to give your answer. All sounds will be played at a comfortable level.</p>`,
  homepage_startExperiment: `Start the experiment`,
  userInfo_description: `This page consists of asking for information about you and your hearing.`,
  userInfo_ageLabel: `How old are you?`,
  userInfoListening_deviceLabel: `What do you use to listen to the sounds of this experiment?`,
  userInfoListening_deviceHeadset: `Headphones`,
  userInfoListening_deviceEarphones: `Earphones`,
  userInfoListening_deviceSpeakers: `Loudspeakers`,
  userInfoListening_hearingIssuesLabel: `According to you, do you have hearing issues? <i data-content="You ask others to repeat, you have problems understanding speech in noise, etc." class="info circle icon"></i>`,
  common_yes: `Yes`,
  common_no: `No`,
  common_dontKnow: `I don't know`,
  userInfoListening_tinnitusLabel: `Do you have tinnitus? <i data-content="Ear whistling." class="info circle icon"></i>`,
  userInfo_hypersensibilityLabel: `Do you have auditory hypersensitivity? <i data-content="Are some sounds loud or painful at modest intensities for you when they do not cause any reaction in others?" class="info circle icon"></i>`,
  userInfo_hypersensibilityImpactLabel: `How disabled are you by this hypersensitivity?`,
  userInfo_hypersensibilityImpactNotAtAll: `Not at all`,
  userInfo_hypersensibilityImpactALittle: `A little`,
  userInfo_hypersensibilityImpactModerately: `Moderately`,
  userInfo_hypersensibilityImpactALot: `A lot`,
  userInfo_soundsReactionsLabel: `Are there any particular sounds that trigger very intense reactions in you such as anger, disgust...?`,
  userInfo_soundsReactionsListLabel: `What are the sounds that trigger these reactions? (separated by commas)`,
  userInfo_soundsReactionsListPlaceholder: `Horn honking, teeth grinding`,
  userInfo_nextForm: `Go to second form`,
  noiseTolerance_title: `A QUESTIONNAIRE FOR ASSESSING DECREASED SOUND TOLERANCE`,
  noiseTolerance_description: `<p><em>Authors: Siepsiak, M., Śliwerski, A., Dragan, W. Ł.</em></p>

      <p>Some people are less sensitive to certain sounds, while other people are more sensitive to certain sounds. </p>
      <p>Are there any sounds which you find particularly burdensome? </p>

      <p>Please indicate how much you agree or disagree with the following statements using the following scale:</p>`,
  noiseTolerance_completelyDisagree: `I definitely do not agree`,
  noiseTolerance_disagree: `I do not agree`,
  noiseTolerance_neutral: `Hard to say`,
  noiseTolerance_agree: `I agree`,
  noiseTolerance_completelyAgree: `I definitely agree`,
  noiseTolerance_statement1: `Some sounds bother me so much that I have difficulty controlling my emotions.`,
  noiseTolerance_statement2: `Unpleasant sounds make me feel overwhelmed.`,
  noiseTolerance_statement3: `I become anxious at the mere thought of an unpleasant sound.`,
  noiseTolerance_statement4: `I believe that my reactions to sounds are exaggerated, but I can’t get rid of them.`,
  noiseTolerance_statement5: `When I hear unpleasant sounds, I start sensing emotions in my body (e.g. I sweat, feel pain, feel pressure, my muscles tens).`,
  noiseTolerance_statement6: `I start feeling anger the moment I see a thing/animal/person that might make an unpleasant sound at any time.`,
  noiseTolerance_statement7: `I put a lot of effort into controlling emotions when I hear an unpleasant sound. `,
  noiseTolerance_statement8: `If I can, I avoid meeting with certain people because of the sounds they make.`,
  noiseTolerance_statement9: `I find some sounds made by the human body unbearable.`,
  noiseTolerance_statement10: `I feel that my mental state worsens if I cannot leave a place where there’s an unpleasant sound.`,
  noiseTolerance_statement11: `I often think about how to drown out unpleasant sounds.`,
  noiseTolerance_statement12: `Some unpleasant sounds make me instantly angry.`,
  noiseTolerance_statement13: `I am scared that unpleasant sounds may impact my future.`,
  noiseTolerance_statement14: `When meeting with other people, I am sometimes irritated because of unpleasant sounds that are present.`,
  noiseTolerance_dislikeLabel: `I consider my aversion to specific sounds as...`,
  noiseTolerance_dislike1: `An extreme problem, that affects my whole life.`,
  noiseTolerance_dislike2: `A severe problem that affects many aspects of my quality of life.`,
  noiseTolerance_dislike3: `A moderate problem, affecting some aspects of my quality of life.`,
  noiseTolerance_dislike4: `A slight problem, slightly affecting my quality of life.`,
  noiseTolerance_dislike5: `Is not a problem, does not affect my quality of life.`,
  noiseTolerance_configureSound: `Set up sound level `,
  soundConfig_description: `<p>We will now adjust the sound level so that it is presented at a comfortable level, neither too low nor too high. You can adjust the volume by moving the slider below.</p>
      <p>You must turn the sound of your device to the maximum volume.</p>`,
  common_playSound: `Play sound`,
  common_replaySound: `Play the sound again`,
  common_soundPlaying: `Sound playing...`,
  soundConfig_startTraining: `Start training`,
  soundTraining_description: `<p>The following sounds are practice sounds. This allows you to test if the volume you chose in the previous step is suitable for you, or if you need to reconfigure it.</p>

      <p>After these few tests have been carried out, you will be able to start the experiment.</p>`,
  common_veryPleasant: `Very pleasant`,
  common_neutral: `Neutral`,
  common_veryUnpleasant: `Very unpleasant`,
  soundTraining_nextSound: `Next test sound`,
  soundTraining_startTests: `Start testing`,
  soundTraining_reconfigureSound: `Reconfiguring sound level`,
  soundTests_description: `<p>The test can now start. You should rate the sounds presented on a pleasant - unpleasant scale. If the sound is very pleasant, you should click on the far left of the scale. If the sound is very unpleasant, you must click on the far right of the scale. If the sound is neutral, you should click in the middle of the scale.In general, the sounds are more or less pleasant or unpleasant, so you must use the full length of the scale to give your answer.</strong></p>

      <p>The sounds are presented randomly three times.</p>
      <p>Please note: once your answer has been saved, it will not be possible to modify it!</p>

      <p>Good luck and thank you for your participation!</p>`,
  soundTests_experimentInProgress: `Experiment in progress...`,
  soundTests_experimentOver: `Experiment complete!`,
  soundTests_nextSound: `Next sound`,
  soundTests_finishExperiment: `Ending the experiment`,
  end_description: `The data was automatically collected, thank you!`,
  end_warningMessage: `Data from the experiment could not be collected. Please come back to this page later (e.g. the next day), or send the following text directly to the person in charge of the experiment:`
}

export default translations
