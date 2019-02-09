(function(){
  'use strict';
//<a href="" class="" data-text="診断結果の文章" data-show-count="false">Tweet #あなたのいいところ</a>
  const userNameInput = document.getElementById('user-name');
  const assessmentButton = document.getElementById('assessment');
  const resultDivided = document.getElementById('result-area');
  const tweetDivided = document.getElementById('tweet-area');

  function removeAllChildren(element){
    while(element.firstChild){
      element.removeChild(element.firstChild);
    }
  }

  assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if(userName.length === 0){
      return;
    }

    removeAllChildren(resultDivided);
    removeAllChildren(tweetDivided);


    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    const tweetParagraph = document.createElement('p');
    tweetDivided.appendChild(tweetParagraph);

    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' +
                       encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);


    twttr.widgets.load();
  };
  userNameInput.onkeydown = (event) => {
    if(event.key === 'Enter'){
      assessmentButton.onclick();
    }
  }

  const answers = [
    '{userName}のいいところは声ですです',
    '{userName}のいいところはまなざしです',
    '{userName}のいいところは情熱ですです',
    '{userName}のいいところは厳しさですです',
    '{userName}のいいところは知識ですです',
    '{userName}のいいところはユニークさです',
    '{userName}のいいところは用心深さです',
    '{userName}のいいところは見た目です',
    '{userName}のいいところは決断力です',
    '{userName}のいいところは思いやりです',
    '{userName}のいいところは感受性です',
    '{userName}のいいところは節度です',
    '{userName}のいいところは好奇心です',
    '{userName}のいいところは気配りですです',
    '{userName}のいいところはその全てです'
  ];

  function assessment(userName){
    //to do 診断処理を実装する
    let sumOfcharCode = 0;
    for(let i = 0; i < userName.length; i++){
      sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
    }
    const index = sumOfcharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g,userName);

    return result;
  }

console.assert(
  assessment('太郎') === '太郎のいいところはまなざしです',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません'
);

console.assert(
  assessment('太郎') === assessment('太郎'),
  '正しくありません'
);

})();
