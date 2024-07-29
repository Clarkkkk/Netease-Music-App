# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

# 1.2.0    (2024-07-29)


## **Features**

* add symbol to indicate the playing song ([de75b427](https://github.com/Clarkkkk/Netease-Music-App/commit/de75b427c7ff7a51e3a0b66a9c6839a085830f30))
* add to songlist ([275c9c14](https://github.com/Clarkkkk/Netease-Music-App/commit/275c9c14e0749dcfd6b753c3999b04ba50ac8c93))
* add songlist panel in user center ([1a1945d5](https://github.com/Clarkkkk/Netease-Music-App/commit/1a1945d5cfda33a842510472047dfcf3d572e916))
* add songlists store and songlists effect ([d0319e57](https://github.com/Clarkkkk/Netease-Music-App/commit/d0319e577399534f0fbff3a559fc67997a247338))
* add play mode switching ([d721c63d](https://github.com/Clarkkkk/Netease-Music-App/commit/d721c63d888b1948b288fc94592b5f083b647576))
* add audioSession for iOS safari ([7401aa2d](https://github.com/Clarkkkk/Netease-Music-App/commit/7401aa2dd5e0223ad2bb8a66a9db3480950f6098))
* can add albums to collections now ([8504779b](https://github.com/Clarkkkk/Netease-Music-App/commit/8504779b48f93ae8fd8e4db47e2e483da4f6f067))
* use space to toggle play/pause ([ce070b2a](https://github.com/Clarkkkk/Netease-Music-App/commit/ce070b2a682f0bdade9ba4d731a65b1390cda8d7))
* add a setting to control whether to trace play records ([b22dc2ef](https://github.com/Clarkkkk/Netease-Music-App/commit/b22dc2ef89a074c3a35f36326df4d5d0695604ad))
* add explanation tooltip for `Select` and `Switch` ([583574ae](https://github.com/Clarkkkk/Netease-Music-App/commit/583574ae45f628a102a062697d5d663d6b607551))
* add album name for the album list ([c0fd1157](https://github.com/Clarkkkk/Netease-Music-App/commit/c0fd11574c8017cf8b84ecbe37a400d0cfaa4d5e))
* new theme netease classic ([7f294ac0](https://github.com/Clarkkkk/Netease-Music-App/commit/7f294ac0ec628f16d641c203b763536eea64d583))
* add a bunch of themes from daisyui and add corresponding settings as well ([e136937e](https://github.com/Clarkkkk/Netease-Music-App/commit/e136937e2aec1c1943e8671272dd611255546b34))
    
    ### **Description**
    
    - add `Select` component
    - move the debug effect to `App.vue`
    - other fixes
    
* add setting page ([54d97d7a](https://github.com/Clarkkkk/Netease-Music-App/commit/54d97d7afd8f78a41b9e7ec73955ec3380c0436a))
    
    ### **Description**
    
    - add a setting to control if to skip songs shorter than 30s
    - add a setting to toggle eruda console for debugging
    - add a new component `Switch`
    - add two utility functions `loadScript` and `mergeClass`
    - update deps
    

## **Bug Fixes**

* should not hide the list when loading more search results ([30fe73b4](https://github.com/Clarkkkk/Netease-Music-App/commit/30fe73b42676aff7cf6d87d00284bd1580817906))
* `scrollIntoView` not working in mobile ([1fdf3f76](https://github.com/Clarkkkk/Netease-Music-App/commit/1fdf3f76f653eb668798fe9a7a79a28da835705b))
* cannot trigger search request in some cases ([d162290b](https://github.com/Clarkkkk/Netease-Music-App/commit/d162290b62e7f9ba8e8e51309c50b107743ea4c0))
* fix song loop not working ([3db0c05c](https://github.com/Clarkkkk/Netease-Music-App/commit/3db0c05c984fcb701c110f5651999e0d046b873b))
* should scroll the lyrics immediately when navigate to the playing page ([a31603ec](https://github.com/Clarkkkk/Netease-Music-App/commit/a31603ec169eac92dd409530a43183ff5bffe025))
* prevent zooming when focusing on input in safari ([ed35c14b](https://github.com/Clarkkkk/Netease-Music-App/commit/ed35c14b57ba05f82ad936c32995c6945f5a916f))
* should prevent scrolling when press space to switch playing ([c18d79bd](https://github.com/Clarkkkk/Netease-Music-App/commit/c18d79bd0a3d000958bc9a637f60bf2517e28058))
* modify the threshold of song skipping ([7602a44c](https://github.com/Clarkkkk/Netease-Music-App/commit/7602a44ce0658190af79a09aa0cbd0fa0a6bb5f8))
* fix bugs in play tracing ([e85ca6cc](https://github.com/Clarkkkk/Netease-Music-App/commit/e85ca6cc8843e5fe7d8af8bff7f603a8ae587f61))
* minor fixes in Setting page ([c5621a4c](https://github.com/Clarkkkk/Netease-Music-App/commit/c5621a4c8a8db4da8bc0e87432cef5f7ddc9f0e9))
* fix sharp installation error ([6f9d11a5](https://github.com/Clarkkkk/Netease-Music-App/commit/6f9d11a508711e9763a553e6639891611c10379c))
* only need the extra audio element in mobile apple devices ([8f07e093](https://github.com/Clarkkkk/Netease-Music-App/commit/8f07e0933d9b47006df640c2bbad669ec05e5739))
* try to fix the safari issue ([b76cfea5](https://github.com/Clarkkkk/Netease-Music-App/commit/b76cfea584aeac85841c1c8f32829de2b02a7865))
* try to fix the safari issue ([4ec0a2f5](https://github.com/Clarkkkk/Netease-Music-App/commit/4ec0a2f5edc934b38f5e0d9070175a700771ece9))
* set the `start_url` to absolute path ([9c8dde08](https://github.com/Clarkkkk/Netease-Music-App/commit/9c8dde08c22481f047968513b9ec73b86522e6fd))
* remove song cache due to compatibility of safari ([34450ff6](https://github.com/Clarkkkk/Netease-Music-App/commit/34450ff60911a50fafe03ab92b8292a91b292903))
* song resources are opaque responses ([e6f24ef4](https://github.com/Clarkkkk/Netease-Music-App/commit/e6f24ef423bc59b4c0a0e1e051a8eb9575c54647))
* no need to show volume control on mobile device ([57118d53](https://github.com/Clarkkkk/Netease-Music-App/commit/57118d5379fa298ffadc7f9a83383ee0468ad246))
* apply temporary fix for safari ([326170a3](https://github.com/Clarkkkk/Netease-Music-App/commit/326170a3d82a7be48806e15315a26a403653a7a6))
* when a song gets loading frequently, load its last part ([fa6ba654](https://github.com/Clarkkkk/Netease-Music-App/commit/fa6ba6542cd5a733b0361850c787b44af44311b7))

## **Styles**

* fix scrollbar style on chrome 121 and above ([4100a632](https://github.com/Clarkkkk/Netease-Music-App/commit/4100a63248b410a2104bf96223c8b43f3471d592))

## **Performance Improvements**

* use CacheFirst for songs ([287c7ecb](https://github.com/Clarkkkk/Netease-Music-App/commit/287c7ecbf22fcdf79a092aee1476622ff6bb4ce2))

## **Chores**

* update patch ([7df88a08](https://github.com/Clarkkkk/Netease-Music-App/commit/7df88a08e345b7fa05577a5a4bc1d723db776ead))
* update deps ([62f96265](https://github.com/Clarkkkk/Netease-Music-App/commit/62f9626519ac0be40f2415dd04a4f0f07767cd40))
* remove the hack as the latest iOS fixes the issue ([bd04ed6c](https://github.com/Clarkkkk/Netease-Music-App/commit/bd04ed6cd0508b8a2d9fabd5f5534a13259ddabb))
* add eslint-plugin-regexp ([2237f0f4](https://github.com/Clarkkkk/Netease-Music-App/commit/2237f0f42894ff068b64dde8b0f153f8b9c6681b))
* run unit tests in github actions ([1c9f41cb](https://github.com/Clarkkkk/Netease-Music-App/commit/1c9f41cb3ef775eabbfed9a4f962fcd237db3612))
* debug logs ([ffa75040](https://github.com/Clarkkkk/Netease-Music-App/commit/ffa7504017cbb930fc2945173b3c8a954c056932))
* add prettier ([b3dea654](https://github.com/Clarkkkk/Netease-Music-App/commit/b3dea654b538046c075f09c8167207e9934e7862))
* update vue-tsc ([08296349](https://github.com/Clarkkkk/Netease-Music-App/commit/082963495572ac2af01f4e35046bde40ee6ec975))
* lint ([ce76b3de](https://github.com/Clarkkkk/Netease-Music-App/commit/ce76b3de7b0fad481e77dd2fa5cb6a8517b93898))
* eslint migrate to flat config ([35884868](https://github.com/Clarkkkk/Netease-Music-App/commit/358848683ea4ffd2011b92d44649ed3f33f44502))
* update storybook to v8 ([8256cb5a](https://github.com/Clarkkkk/Netease-Music-App/commit/8256cb5a3f65167f599ef230016c1f21a4946687))
* update deps ([1d21824a](https://github.com/Clarkkkk/Netease-Music-App/commit/1d21824a4660c96bcdf9bc1233fbaf0763e8d614))
* update github actions from node 16 to node 20 ([6c456344](https://github.com/Clarkkkk/Netease-Music-App/commit/6c4563448852614b96740bbed7dbd4d78eb50728))



# 1.1.0    (2024-03-17)


## **Features**

* remember the last volume ([3d9daa43](https://github.com/Clarkkkk/Netease-Music-App/commit/3d9daa434b112f68ede95ee10a38c62b607e337e))
* use mouse wheel to adjust volume ([becfae44](https://github.com/Clarkkkk/Netease-Music-App/commit/becfae44e37ef04a81c5c49a266ee694b087000b))
* add volume control ([7ea15588](https://github.com/Clarkkkk/Netease-Music-App/commit/7ea15588d996b5a282bf659bdf8e0f5a4762a596))
* add jump to album in the context menu of the playing page ([80b918ab](https://github.com/Clarkkkk/Netease-Music-App/commit/80b918ab5bc7beb5901ef20fcd99897f8f9668fe))
* add Tooltip to display the sub name of a song ([1d4530c6](https://github.com/Clarkkkk/Netease-Music-App/commit/1d4530c69fe9e5bdd2ee197dca23352a9cb3aff2))
* add operation buttons in playing page ([ae3fa031](https://github.com/Clarkkkk/Netease-Music-App/commit/ae3fa0312c7616d5616acff4ce1d14489ff3fcd7))
    
    ### **Description**
    
    - add like and dislike button
    - add playlist button
    - add other buttons just for the unimplemented features
    - move and rename some files
    
* jump to album page from SongTable ([a99e7577](https://github.com/Clarkkkk/Netease-Music-App/commit/a99e75775839765d4bb46c8c52079f5418b93679))

## **Bug Fixes**

* fix volume thumb's unintentional position change when open ([0d64c119](https://github.com/Clarkkkk/Netease-Music-App/commit/0d64c119530650be2c5c52fb6ab67ff2b70bc53f))
* remove the delay of useIsHovering ([1c4dff3e](https://github.com/Clarkkkk/Netease-Music-App/commit/1c4dff3e8ebf86d813d41352ad8efe35cfb4f33e))
* should set the volume of audioRef in onMounted hook ([9a20f60c](https://github.com/Clarkkkk/Netease-Music-App/commit/9a20f60cf4634c2ef54e48e51d6247f3119cf660))
* fix bugs in scrolling to adjust volume ([97aca217](https://github.com/Clarkkkk/Netease-Music-App/commit/97aca2170d6ef4303521497667671e7e8e5c5038))
* song's url could be null ([34c9306c](https://github.com/Clarkkkk/Netease-Music-App/commit/34c9306c0556d67227a5634ba65034661e95b92c))
* wrong size when the cover is not 1 to 1 ratio ([3a5b7d70](https://github.com/Clarkkkk/Netease-Music-App/commit/3a5b7d70cffd40421eabbb69c97fbe489b4e4dcf))
* add delay for tooltip ([86421a7b](https://github.com/Clarkkkk/Netease-Music-App/commit/86421a7b3ece4c89a34eb34cc44eb2bc7ad1c4b2))
* update vue and the patch ([8d2f66c8](https://github.com/Clarkkkk/Netease-Music-App/commit/8d2f66c8180cec8ac3fb8e6bc9b9c26045c6f1fc))
* the description of an album could be `null` ([5057278f](https://github.com/Clarkkkk/Netease-Music-App/commit/5057278fa2e31c463da03f480db57500930d35d2))
* reduce the time of dislike operation ([1838783f](https://github.com/Clarkkkk/Netease-Music-App/commit/1838783f4023ad0f23d135e494dbe024a26410c4))
* minor bug fixes ([bde3e663](https://github.com/Clarkkkk/Netease-Music-App/commit/bde3e6630408cd7fb061cf77d9306b6390a07140))
    
    ### **Description**
    
    - the thumb's position when dragging is not right after window resizing
    - should not show the tooltip of the title when its text is 'null'
    - other appearence adjustments
    
* fix type errors ([bf768355](https://github.com/Clarkkkk/Netease-Music-App/commit/bf76835559e62e413b296a5e7fcd3d779ed292bd))
* should not switch mode when there are network errors ([9df0b16d](https://github.com/Clarkkkk/Netease-Music-App/commit/9df0b16d884d84354a321e1fe368daaa6855418d))
* unify date format ([17f7e478](https://github.com/Clarkkkk/Netease-Music-App/commit/17f7e47898149a5713ba5ab106e3d195587f2a60))

## **Styles**

* add transtion to nav links ([feb5398b](https://github.com/Clarkkkk/Netease-Music-App/commit/feb5398bc7e482a8a209064a0dde9279be32f9bf))

## **Performance Improvements**

* use vite-plugin-imp to import lodash on demand ([d22ab5cc](https://github.com/Clarkkkk/Netease-Music-App/commit/d22ab5cc32baeb35003750d344189c793e8b83f9))
* add prefetch everywhere ([7abd03c4](https://github.com/Clarkkkk/Netease-Music-App/commit/7abd03c427a9c68f9e987d55a405263c9548fec5))
* add prefetch for nav links ([c5bf7384](https://github.com/Clarkkkk/Netease-Music-App/commit/c5bf73847bb2d542ac71e339917db3cb816f7b10))

## **Documentation**

* add storybook for the components ([35bdd41b](https://github.com/Clarkkkk/Netease-Music-App/commit/35bdd41b1f3e75e59c86bb3a743daa5bd5f22d23))

## **Chores**

* add `code-inspector-plugin` ([75506e49](https://github.com/Clarkkkk/Netease-Music-App/commit/75506e49b20cc28cab57f5a486fba915f910a902))
* update vue-tsc ([a68b81b4](https://github.com/Clarkkkk/Netease-Music-App/commit/a68b81b4ea699fc3c1f9240e106a35914d430fba))
* update storybook to 8.0.0-beta.5 ([dd36d70f](https://github.com/Clarkkkk/Netease-Music-App/commit/dd36d70fa0f319dff0cbd8b7c419d4a643db6495))
* try out storybook@canary ([f4d38998](https://github.com/Clarkkkk/Netease-Music-App/commit/f4d38998e6c3968eee00a636f3249c9599c5feb9))
* update tailwindcss, prettier and relative deps, and format again ([1562e787](https://github.com/Clarkkkk/Netease-Music-App/commit/1562e787ef57cb7570296a61e9159155ef295935))
* update vue ([eb260f85](https://github.com/Clarkkkk/Netease-Music-App/commit/eb260f850a56d6f1ec2745cb7d7f21555a0e23cd))
* add vite-bundle-visualizer ([f1b76cf5](https://github.com/Clarkkkk/Netease-Music-App/commit/f1b76cf5404585581a1be0dbacb7a5b7916d213f))
* format ([25fedb70](https://github.com/Clarkkkk/Netease-Music-App/commit/25fedb70061276477a520037d089d153e417a80a))
* update deps ([e4068731](https://github.com/Clarkkkk/Netease-Music-App/commit/e406873196c76f2abcf05bae88fa6164b1ededcf))
* log audio error ([01e997d2](https://github.com/Clarkkkk/Netease-Music-App/commit/01e997d2b5ced9f4e390ed35af224d1c50007abe))
* add unplugin-turbo-console for a better console in development ([947d2205](https://github.com/Clarkkkk/Netease-Music-App/commit/947d2205b415c9c3e9f54f84726334f206d2c826))
* update to vite 5 and fix minor bugs ([309243f2](https://github.com/Clarkkkk/Netease-Music-App/commit/309243f2b910fbda3f895867e4e9c81a4f276bc0))
* update deps ([47747d8f](https://github.com/Clarkkkk/Netease-Music-App/commit/47747d8f946d3b6799b72b195d612d7603be829d))
* add manifest id ([1fb87108](https://github.com/Clarkkkk/Netease-Music-App/commit/1fb87108aa6d53569e100678fb5062c47ba8c1db))
* cleanup some code ([ecbb1f87](https://github.com/Clarkkkk/Netease-Music-App/commit/ecbb1f87b408fbcfc8e327f95801dd0cd786017e))



# 1.0.0    (2023-10-07)


## **Bug Fixes**

* fix drag issues on mobile devices ([cf5909a3](https://github.com/Clarkkkk/Netease-Music-App/commit/cf5909a3f8f2e31bfe9b4e8e3b03b8e7cdbd08d9))
* add reload button when lyrics loading failed ([c0f67924](https://github.com/Clarkkkk/Netease-Music-App/commit/c0f67924681bed1d13329b2d04a1c18cc15a8ff8))

## **Styles**

* improve some styles in dark mode ([20dea22c](https://github.com/Clarkkkk/Netease-Music-App/commit/20dea22c9541e487e53e860a120f364180f4e0c2))



# 1.0.0-beta.3    (2023-10-06)


## **Features**

* navigate to album page from song item ([e5394004](https://github.com/Clarkkkk/Netease-Music-App/commit/e539400411387ca9f9c77a0ae7b1e24c8b5c0f06))

## **Bug Fixes**

* improve accessibility of the search input ([975f5a10](https://github.com/Clarkkkk/Netease-Music-App/commit/975f5a105ef6cd9f300c89196e4047f5cfc3ecec))
* fix a bug that cause unnecessary navigation when click play all button ([4ff62abe](https://github.com/Clarkkkk/Netease-Music-App/commit/4ff62abe1de8008c97a5718ef975269b9027a122))
* reload image when loading failed ([dd03dded](https://github.com/Clarkkkk/Netease-Music-App/commit/dd03dded6b16b5c8d55aafa48bc7ade940086e5e))
* fix wrong navigation link in navbar ([8d51064f](https://github.com/Clarkkkk/Netease-Music-App/commit/8d51064f0bf5cead0df5f84e32aa16a39751669e))
* add music resources to pwa cache to avoid playing interrupted due to expired resources ([3aa2bf93](https://github.com/Clarkkkk/Netease-Music-App/commit/3aa2bf9300f1dbf86d207c3d5b8468525c22605f))
* reload the song when play failed ([9e129120](https://github.com/Clarkkkk/Netease-Music-App/commit/9e1291203e7da281fde1b37ee571f83a8fe852c5))
* fix a bug in homepage ([707e9487](https://github.com/Clarkkkk/Netease-Music-App/commit/707e9487b1fb28041c372bbf1811673eb9fb8407))

## **Styles**

* revamp the style of search bar ([626749de](https://github.com/Clarkkkk/Netease-Music-App/commit/626749de788f24ba2956c4739c159f3309ab4416))
* add gradient to Lyrics ([2b56b070](https://github.com/Clarkkkk/Netease-Music-App/commit/2b56b070209feffce9057814b52187f502e69176))
* fix a style error in RecommandSongs when the list is empty ([f4be7322](https://github.com/Clarkkkk/Netease-Music-App/commit/f4be73224eff60585639973fdebdca3f418d06f4))
* improve navbar's style ([d836c4af](https://github.com/Clarkkkk/Netease-Music-App/commit/d836c4af83112b983e47b51b4a4446ff3ef4b4ea))
* improve some details of cover flow ([77c090f5](https://github.com/Clarkkkk/Netease-Music-App/commit/77c090f5f39ff50b2ee61508bff46db931b22184))
* fix blurry images due to transform scale ([db14ec02](https://github.com/Clarkkkk/Netease-Music-App/commit/db14ec02271ecbe88484a62ba06ca56fbc0dfd72))
* improve the appearance of cover flow ([db46af01](https://github.com/Clarkkkk/Netease-Music-App/commit/db46af01fe33a5c566f727a4ae81d7e7b0b0bbcd))

## **Chores**

* modify config to bypass the restriction of HSTS ([d8f301dc](https://github.com/Clarkkkk/Netease-Music-App/commit/d8f301dc1cc892dbcbcb7eaa985aee8a150f58a1))
* disable eruda ([d17b238b](https://github.com/Clarkkkk/Netease-Music-App/commit/d17b238bdedcdf6ede8df4f8f16aab52a19b3335))
* add debug console ([9da5279a](https://github.com/Clarkkkk/Netease-Music-App/commit/9da5279a5ab4d92d69ea6aaf4f0539e90c121b95))
* add debug console ([9802177e](https://github.com/Clarkkkk/Netease-Music-App/commit/9802177e3c570de5c9070a29c3a3b183e0d5e0c6))
* update deps ([77dd4cbd](https://github.com/Clarkkkk/Netease-Music-App/commit/77dd4cbd975ed1b052e6b91aefc613df375262c4))
* update deps ([3af27203](https://github.com/Clarkkkk/Netease-Music-App/commit/3af272035b87c240bd7140d0d550981694ff4abd))



# 1.0.0-beta.2    (2023-08-05)


## **Features**

* add song info on the back of cover in playing page ([b43c9473](https://github.com/Clarkkkk/Netease-Music-App/commit/b43c9473d03e5838d65a39d1cda087167aac85a3))
* add theme-color meta tag for status bar ([fcd6a5b5](https://github.com/Clarkkkk/Netease-Music-App/commit/fcd6a5b59a6b6c5758f6e80a19b66a796f835029))
* albums and songlists in home page, search page and user center page are clickable now ([0e06a805](https://github.com/Clarkkkk/Netease-Music-App/commit/0e06a805486b367a4e6061720cc46754fea3d9a4))
* click the search input on the navbar is now nevigating to the search page directly ([dbcd7346](https://github.com/Clarkkkk/Netease-Music-App/commit/dbcd7346d1275ff718ac30281f3447f916c72337))

## **Bug Fixes**

* fix layout problems when the playlist is long ([2a05b8c2](https://github.com/Clarkkkk/Netease-Music-App/commit/2a05b8c224ed0698196f7aa81ab8062e0fc84c62))
* fix navbar padding ([e7c18bbf](https://github.com/Clarkkkk/Netease-Music-App/commit/e7c18bbf820ee332fc3dc98ed13000bb8ab694e6))
* add `autoplay` to let safari fire the `canplay` event and play next song ([464bc7a7](https://github.com/Clarkkkk/Netease-Music-App/commit/464bc7a7d254cb2b5bddf8c16758dd41e7d1a0e2))
* use css mode to get rid of some weird behaviours ([1f644584](https://github.com/Clarkkkk/Netease-Music-App/commit/1f6445849ca21eb9f173725507e2c7fb0271c2d2))
* fix a bug where the playing song info won't load if not in playing page ([a69721d4](https://github.com/Clarkkkk/Netease-Music-App/commit/a69721d408a17b2c3c1b7fc145d31be90d2e85fb))
* fix wrong text order ([e603c325](https://github.com/Clarkkkk/Netease-Music-App/commit/e603c3254969563ee0b5c83f530ec17feb26c09b))
* when open the playlist, it will scroll to the current playing song now ([6b59ee28](https://github.com/Clarkkkk/Netease-Music-App/commit/6b59ee2802f3fbb4566832558d9611d1cac1db50))
* fix rounded border issues ([1c6fe3b7](https://github.com/Clarkkkk/Netease-Music-App/commit/1c6fe3b7df83175f3d33056ed463a1ae65799792))
* fix an error that could possibly read property of undefined ([5f364349](https://github.com/Clarkkkk/Netease-Music-App/commit/5f3643496446af5b8b3d948cef7be42c9ad27d55))
* fix a bug that the ContextMenu does not close after click ([21167ff4](https://github.com/Clarkkkk/Netease-Music-App/commit/21167ff40823b840ef5a623665b7512bf8d972ff))
* try to fix the glitch when scrolling cover flow in mobile devices ([fa854119](https://github.com/Clarkkkk/Netease-Music-App/commit/fa85411959d8627f175486cdda5c59731e9d5aec))
* fix wierd effects of cover flipping animations in safari ([f0248ac9](https://github.com/Clarkkkk/Netease-Music-App/commit/f0248ac934dd31ae08ea2ca2f1c7f03d42cc0ed1))
* fix an issue that z-index of `LoginModal` not working due to specificity ([0006f58a](https://github.com/Clarkkkk/Netease-Music-App/commit/0006f58a89c5e13f8e2ed8ea2067cba32a0d1fdd))
* fix the wrong color of cover flow in dark mode ([e4962fe4](https://github.com/Clarkkkk/Netease-Music-App/commit/e4962fe42e0644b6cded7447e500b2f19c049bbb))
* try to fix the border radius issue under webkit ([4a1d717c](https://github.com/Clarkkkk/Netease-Music-App/commit/4a1d717c8e9ebc6ce941127e1d0d8336452bd837))
* fix a bug that `collapsible` prop is not working properly and improve the strategy to guess the max height more acurately ([e5d01f71](https://github.com/Clarkkkk/Netease-Music-App/commit/e5d01f71d77200f42f886c0bdc3118a7bed4246c))
* fix the wrong path to navigate to the user center in `MobileMenu` and fix the bug that the menu not disappearing after clicking login button properly ([75a86164](https://github.com/Clarkkkk/Netease-Music-App/commit/75a861642c51d9aaf6ceb2accc98f8ac780021a1))

## **Styles**

* add animations to the fm button when playing fm ([9bf55a17](https://github.com/Clarkkkk/Netease-Music-App/commit/9bf55a176e524c4b43adf017298d2db57c626cca))
* unify the styles of Drawer and ContextMenu ([4d7ca94e](https://github.com/Clarkkkk/Netease-Music-App/commit/4d7ca94ef9686152dfc9f669186253716eb8bd36))
* improve the ui in devices with a notch ([f424650c](https://github.com/Clarkkkk/Netease-Music-App/commit/f424650cd8ddeb94b3f7a5463f46ca988e800910))
* fix a bunch of style issues in mobile view and improve the user experience in many ways ([77385372](https://github.com/Clarkkkk/Netease-Music-App/commit/77385372f4d0d4ea55f68a669880f659a40b98e3))
    
    ### **Description**
    
    - adjust the height of `ContextMenuItem`
    - increase the z-index of `LoginModal`
    - add `safe-area-inset-bottom` for mini control
    - use the blured cover as the background of album page and songlist page, instead of the extracted color which is not accurate
    - adjust the padding of album page and songlist page in mobile view
    - address the clip problem of banners in webkit by removing the paint containment
    - add loading animations and fixed height for `NewAlbums`
    - add a 'show more' button for `NewSongs` in mobile view
    - add min height for the list in `NewSongs` in mobile view to avoid layout shift when change tabs
    - adjust the styles in home page to avoid moving horizontally
    - fix overflow issues of the cover in playing page
    - fix the wrong color of info in playing page in dark mode and adjust styles for mobile view
    - fix overflow issues of the lyrics on the back of the cover
    - adjust styles in mobile view in playing page
    - add loading for `MixedPanel` in search page
    - fix an issue that the keyboard is not showing search button when typing in search input
    - fix view transition issues of the search input
    - adjust the filter effect of the background image in user center page
    - during view transitions, the page is not able to interact regardless of the animation property, so remove the code that were intended to disable the transitions of root
    

## **Refactor**

* expose the `currentTab` to slots and allow to pass the loading status to props in `Tabs` ([a1f6b335](https://github.com/Clarkkkk/Netease-Music-App/commit/a1f6b3351b0f9c3ac1a1b46e961fcf58545a571d))

## **Chores**

* update deps ([62a9233f](https://github.com/Clarkkkk/Netease-Music-App/commit/62a9233f8de69ada3444befece9b5cb65cc3ff6f))
* update `vue-view-transitions` ([a9cf2170](https://github.com/Clarkkkk/Netease-Music-App/commit/a9cf2170716dc3125954d23099ac42fde03dfdc5))
* specify the host of the dev server ([9af7c5bc](https://github.com/Clarkkkk/Netease-Music-App/commit/9af7c5bc54849b5c1d65e94f5c3b2b58a826c641))



# 1.0.0-beta.1    (2023-07-27)


## **Features**

* add pwa pwa icons and splash screen images, and modify some relative configs ([a1796b0f](https://github.com/Clarkkkk/Netease-Music-App/commit/a1796b0fc322a66ce3db101f59984eceaf5bc0d5))
* change nav styles and add a drawer menu for mobile view ([cab5db93](https://github.com/Clarkkkk/Netease-Music-App/commit/cab5db9399a81682f124c330a95bc2470e9c0ea4))
    
    ### **Description**
    
    - add `MobileMenu`
    - add `Drawer`, `DrawerBackground`, `DrawerContent`, `DrawerTrigger`
    - add `createContext` to use `provide` and `inject` conveniently
    - adjust nav style for mobile view
    
* show lyrics on the back of cover with a beautiful animation in mobile devices ([5167aba2](https://github.com/Clarkkkk/Netease-Music-App/commit/5167aba2b753d21a62db4eab146dfde748551b02))

## **Bug Fixes**

* should close the drawer when click to log in ([5ab8b6be](https://github.com/Clarkkkk/Netease-Music-App/commit/5ab8b6be20081e6b15a977416e4edad06ab9d5d6))
* fix invalid config in workbox ([833569a2](https://github.com/Clarkkkk/Netease-Music-App/commit/833569a2cb35ca88c558871c87d1bdb6785e7ecc))
* add preconnect with anonymous crossorigin attribute for preflight requests ([f2f3c1ae](https://github.com/Clarkkkk/Netease-Music-App/commit/f2f3c1aec8e990fd31ec9a8567d5a4a07ab35560))
* add proper `crossorigin` attribute for `preconnect` ([3f5c56fc](https://github.com/Clarkkkk/Netease-Music-App/commit/3f5c56fce24b50d502414d3f5c129cfe0bf36683))
* fix an error when no translated lyrics ([980db5ac](https://github.com/Clarkkkk/Netease-Music-App/commit/980db5ac9e9b1d0d28050f9a93947ac723b38a19))
* fix repeated reporting when song ends ([beec2484](https://github.com/Clarkkkk/Netease-Music-App/commit/beec2484a2bef6522ab0c02ef9538c7f0c91486e))
* fix a bug in `Tabs` ([b02228cb](https://github.com/Clarkkkk/Netease-Music-App/commit/b02228cbbbf51cc3fc49f31a966d5b5ab927d19c))
* fix view transitions missing between mini controls and playing page when not playing ([77e3ec90](https://github.com/Clarkkkk/Netease-Music-App/commit/77e3ec902d72f6d92eb06bb8547ec0bc7be58799))
* do not report when not logged in ([56dd409e](https://github.com/Clarkkkk/Netease-Music-App/commit/56dd409e979dcfcd354cd4026ac05175477c4de1))
* `MobileMenu` should show login button when not logged in ([4fa5d1a6](https://github.com/Clarkkkk/Netease-Music-App/commit/4fa5d1a6bceea5ed0c3f355c31a7a83d38763d4c))

## **Styles**

* solve clip problems caused by `contain` property and adjust some layout for mobile view ([5e8f01d9](https://github.com/Clarkkkk/Netease-Music-App/commit/5e8f01d94bc6dbea497dd4d4f43c99b3092ecbf2))
* adjust styles of search page to fit in mobile view ([659bf2f4](https://github.com/Clarkkkk/Netease-Music-App/commit/659bf2f415c054213502a12c3abd383c5a1f17fc))
* adjust styles of user center page to fit in mobile view ([559fe7d2](https://github.com/Clarkkkk/Netease-Music-App/commit/559fe7d284ddb38a6e9112b52d1e518dade3a898))

## **Performance Improvements**

* inline the service worker register script and precache more relavent files ([cf2fc493](https://github.com/Clarkkkk/Netease-Music-App/commit/cf2fc49339ad130eef39294ee46e36159294ffa5))
* add api url to `preconnect` and `dns-prefetch` ([5be22fd8](https://github.com/Clarkkkk/Netease-Music-App/commit/5be22fd80e63b37a69599126586e0acb78a26b41))
* add preconnect for the image origin ([ea3b6a8c](https://github.com/Clarkkkk/Netease-Music-App/commit/ea3b6a8c1f003ea752df5931da9a67b04085e17e))
* remove `loading="lazy"` in `Banner` ([b352e976](https://github.com/Clarkkkk/Netease-Music-App/commit/b352e976f642180564f9f23a7afa0a7695232480))
* add size constraint to more images to reduce their download size ([6c64a6ae](https://github.com/Clarkkkk/Netease-Music-App/commit/6c64a6ae7e3e078277aaf54146a6f0723768942c))
* add css containment for more elements and reduce `.btn` animations for performance ([13555242](https://github.com/Clarkkkk/Netease-Music-App/commit/1355524203342eeff497030d3901d88c40702a69))
* adjust some styles to reduce render pressure ([fc57560c](https://github.com/Clarkkkk/Netease-Music-App/commit/fc57560ca3eac883f2a28e757b05669a2352e580))
* disable blur effect for loading images by default ([32b9aca8](https://github.com/Clarkkkk/Netease-Music-App/commit/32b9aca8be75166ba4d21dbe1b133384b28301fd))
* add css containment for home page components ([f046b4bd](https://github.com/Clarkkkk/Netease-Music-App/commit/f046b4bd3e7dd4691152dd67b2bfc6d0e28ea7b2))

## **Chores**

* no need to add timestamp when requesting ([51ddac45](https://github.com/Clarkkkk/Netease-Music-App/commit/51ddac45ede5a0ba9545ec7d55354d2ece4fe447))
* clear console logs ([812f6a81](https://github.com/Clarkkkk/Netease-Music-App/commit/812f6a8123fdade8e6c940c83bc3459ccd9e8f68))



# 1.0.0-alpha.3    (2023-07-21)


## **Features**

* add several panels for search page to display results in seperate categories ([6124efe0](https://github.com/Clarkkkk/Netease-Music-App/commit/6124efe037da2163d99c76cda33d7a4919ded322))
    
    ### **Description**
    
    - split results into 5 tabs and panel. (mixed, song, songlist, album, lyrics)
    - add a component `Collapsible`
    - add relative apis
    
* lyrics in playing page ([7b6bdce9](https://github.com/Clarkkkk/Netease-Music-App/commit/7b6bdce91372c59176a9a994519ea7cd568ffa75))
* report play record ([684e8a70](https://github.com/Clarkkkk/Netease-Music-App/commit/684e8a70890913addeec2b42488e1a4c7b459d92))
    
    ### **Description**
    
    - add `sourceid` for Song
    - add `useAlbum` and use it to remove some code
    - add `updating` for `currentSong.status`
    

## **Bug Fixes**

* fix problems in `Tabs` ([7c1e679e](https://github.com/Clarkkkk/Netease-Music-App/commit/7c1e679e32a7e08be8b676fe99f8833eec65c39d))
* address an issue with repeated reporting ([4a2fdc83](https://github.com/Clarkkkk/Netease-Music-App/commit/4a2fdc833e0d0893ad4270bd568a47f0246f745e))
* use https in RecentSongs ([f4f03a88](https://github.com/Clarkkkk/Netease-Music-App/commit/f4f03a88bee471eafc73d9230c264e4851c6caad))

## **Refactor**

* write `Tabs` component and refactor relative code ([5de20749](https://github.com/Clarkkkk/Netease-Music-App/commit/5de20749ab9d924bbaca3c2c42e361b1fb6dca6e))

## **Performance Improvements**

* add `loading="lazy"` in image of AlbumItem in home page ([24c61ded](https://github.com/Clarkkkk/Netease-Music-App/commit/24c61ded8201888aeb155a11ac456eb478c86eb0))
* reduce image size and add `contain` for some elements ([9d2a5e84](https://github.com/Clarkkkk/Netease-Music-App/commit/9d2a5e84cbfad9f875f02ef787fe7c15af82d8cf))

## **Test**

* add test for `prependZero` ([602f9874](https://github.com/Clarkkkk/Netease-Music-App/commit/602f9874076f93ba6c1e0b49a2e671e37e3c0e8e))

## **Chores**

* update deps ([0ad8c6d7](https://github.com/Clarkkkk/Netease-Music-App/commit/0ad8c6d73641bcc5f403d01be3d7ceafe69268db))
* add log to address repeated report issues; update deps ([26638f71](https://github.com/Clarkkkk/Netease-Music-App/commit/26638f71439fb85509c5b9f4403fb01c381530d0))
* fix banner style, update deps and add log ([6f85e5ff](https://github.com/Clarkkkk/Netease-Music-App/commit/6f85e5ff54eb9ef365dca620d4e659c3063f15a5))
* regenerate CHANGELOG.md with aaron-preset ([ecf8dc05](https://github.com/Clarkkkk/Netease-Music-App/commit/ecf8dc05ab2dd1bcf9c621cb3345d8f9068d4051))
* update and patch vue-tsc ([e5bd93ed](https://github.com/Clarkkkk/Netease-Music-App/commit/e5bd93ed472fbf029c92842a3029cc1a852680e9))



# 1.0.0-alpha.2    (2023-07-09)


## **Features**

* finish my-music page ([f8c14bf6](https://github.com/Clarkkkk/Netease-Music-App/commit/f8c14bf6694ba60b947eeafd55fa42c6eab444fe))
    
    ### **Description**
    
    - favorite songs
    - recent songs
    - user info
    - useLoginService to provide two hooks: onProfileLoaded, onLoggedIn
    - add my music in navbar
    - related apis
    - add a slot in SongItem
    
* scrollable album list with beautiful and fluent animation ([0efb9e9f](https://github.com/Clarkkkk/Netease-Music-App/commit/0efb9e9f44cd624132451ff6e053f368e02e7f7b))
* play the songlist right in the search results or songlist page ([d86c992b](https://github.com/Clarkkkk/Netease-Music-App/commit/d86c992b65b051f9d01ccb01053cbceab9ba672d))
* search pages ([fb1b312c](https://github.com/Clarkkkk/Netease-Music-App/commit/fb1b312c9ef1c57d5b3b25a6a9774ae3f407d9d0))
    
    ### **Description**
    
    - search input on Nav
    - search input transition during routing
    - mixed search result including songs, songlists and albums
    - add padding at the bottom for mini music bar
    
* album page ([d81bf1ae](https://github.com/Clarkkkk/Netease-Music-App/commit/d81bf1aea6daf9dccbf5ef7e4b5c626429c85663))

## **Bug Fixes**

* fix some ui problems ([a2b9aa4a](https://github.com/Clarkkkk/Netease-Music-App/commit/a2b9aa4a2d11ff07fad8fcd4c22e6659d9665045))
* fix z-index problems of album list ([30dec766](https://github.com/Clarkkkk/Netease-Music-App/commit/30dec7669e39fd193df1ce5556f21a1a272523c0))
* minor fixes ([6d997c04](https://github.com/Clarkkkk/Netease-Music-App/commit/6d997c04c79a31d99cd87469888258bf287b080c))
    
    ### **Description**
    
    - redirect to `/` when enter `index.html`
    - hide recommended modules when not logged in
    
* use https in profile images ([240afbef](https://github.com/Clarkkkk/Netease-Music-App/commit/240afbef23400c075a290180ad859598217bee14))
* fix type error ([13961d45](https://github.com/Clarkkkk/Netease-Music-App/commit/13961d452d8b5369d3c9e467bf636abcf5533b12))

## **Styles**

* add view transitions for MiniMusicControl and playing page ([15441b61](https://github.com/Clarkkkk/Netease-Music-App/commit/15441b615a57b7fe8799e0f079757586319b2ec2))
* adjust the ui of homepage ([e5f7b18e](https://github.com/Clarkkkk/Netease-Music-App/commit/e5f7b18e3dd6d9ac5b12c4d34795decc0ec55ef6))
* make search input transitions smoother ([9d76e353](https://github.com/Clarkkkk/Netease-Music-App/commit/9d76e3536a0738e2c6e738786ea5d17d3d804492))

## **Chores**

* update typescript eslint ([3f79e722](https://github.com/Clarkkkk/Netease-Music-App/commit/3f79e72245c2adc471fb2191cf906bb7bf746d62))
* add LICENSE ([afacec0d](https://github.com/Clarkkkk/Netease-Music-App/commit/afacec0d1844f41e6bf7e24b40a12d9986fef72c))



# 1.0.0-alpha.1    (2023-06-25)


## **Features**

* ui improvements ([f3a28e59](https://github.com/Clarkkkk/Netease-Music-App/commit/f3a28e590203e4e9364f9b768f8a5ac2fc31d48c))
* add gradient in songlist page ([50403268](https://github.com/Clarkkkk/Netease-Music-App/commit/504032683702bda74896be7023ee1c8a12b46f31))
* new songs in homepage and ui improvements ([a883f4ae](https://github.com/Clarkkkk/Netease-Music-App/commit/a883f4ae0b7b6103034ebe2db77c7addf2a93e01))
* RecommandSonglists ui ([4858e068](https://github.com/Clarkkkk/Netease-Music-App/commit/4858e068abd5ce07b7c1f7d308d93fd7ee23ca3e))
* improve ui and ux in MiniMusicControl ([e8e9e074](https://github.com/Clarkkkk/Netease-Music-App/commit/e8e9e0744c8d8de4c1c14ac053cef0e0657bf0d2))
* add KeepAlive to RouterView ([f853bf0e](https://github.com/Clarkkkk/Netease-Music-App/commit/f853bf0ed991bb4b0f756337ae57b0b4e60bd76b))
* play all songs for RecommandSongs ([260f2f8b](https://github.com/Clarkkkk/Netease-Music-App/commit/260f2f8b1f4874e92090c94baae7cbe2582536cd))
    
    ### **Description**
    
    - fix a problem when switch between radio and songs
    - improve some ui
    
* click mini control to go to playing page ([a26a6fa9](https://github.com/Clarkkkk/Netease-Music-App/commit/a26a6fa98c80d68c148dead49e67ff7e7ba646c0))
* load on scroll in songlist page ([3436925f](https://github.com/Clarkkkk/Netease-Music-App/commit/3436925fbea9d5035494f1aa568dd9d965ba7de5))
* mini music player ([792b1866](https://github.com/Clarkkkk/Netease-Music-App/commit/792b1866aa8805370a9e71168913e97aa6e32620))
* banner navigation ([36c3fc81](https://github.com/Clarkkkk/Netease-Music-App/commit/36c3fc81b974f479e395feb8695d323d539e925c))
* support mediaSession ([095b046e](https://github.com/Clarkkkk/Netease-Music-App/commit/095b046e12fc65af8a4919d888e04cb558eea0f5))
* navigate to songlist page via recommanded songlists ([66f700fa](https://github.com/Clarkkkk/Netease-Music-App/commit/66f700fa76c5c557e6f7c52a3543211032f803ed))
* ability to play songlist ([a644edcf](https://github.com/Clarkkkk/Netease-Music-App/commit/a644edcf8a1dd57458b29f017ffa08bca8a1cf79))
    
    ### **Description**
    
    - move personal fm to the right of navbar
    - play the song and play the song next
    
* songlist page and components ([c4b2816a](https://github.com/Clarkkkk/Netease-Music-App/commit/c4b2816af9cb1fced0cb962e8beb0758c28171a9))
* useDeviceType ([2b74bca6](https://github.com/Clarkkkk/Netease-Music-App/commit/2b74bca60eea950c1f7a5e232dcc03e2b239173b))
* SongItem component ([5cd7ab64](https://github.com/Clarkkkk/Netease-Music-App/commit/5cd7ab64108b014756cefc6c936ad5b5d657f12d))
* ContextMenu component ([fa616046](https://github.com/Clarkkkk/Netease-Music-App/commit/fa61604620284d4943b38b9424a6795ea33eed11))
* show avatar after login ([ebfcb6fb](https://github.com/Clarkkkk/Netease-Music-App/commit/ebfcb6fb69168f58847c0b0b69bb47cd11a3ffbd))
* play page adaptive design ([6fb9b9fa](https://github.com/Clarkkkk/Netease-Music-App/commit/6fb9b9fac7189753a9215a0ad68057684932ba68))
* homepage adaptive design ([25ebbf26](https://github.com/Clarkkkk/Netease-Music-App/commit/25ebbf26d4f50c4f1c4116c91681eff6048a53ea))
* add content to homepage ([958fcfe3](https://github.com/Clarkkkk/Netease-Music-App/commit/958fcfe3b943efee8d44dd119d71156592c8ae77))
* change icon style to bold ([0ff5938c](https://github.com/Clarkkkk/Netease-Music-App/commit/0ff5938cd2f2bc89fb01cd43c206aa4ca0d2c0d4))
* global scrollbar style ([68e559e9](https://github.com/Clarkkkk/Netease-Music-App/commit/68e559e92099d0dcdc402463440382fe0811f3f0))
* configure github actions for building and deploying ([03ae969a](https://github.com/Clarkkkk/Netease-Music-App/commit/03ae969a3cee7f3c1f7a83ccf31f5437bc453bd2))
* radio page ([7495f7c8](https://github.com/Clarkkkk/Netease-Music-App/commit/7495f7c8703a66f14606a2edc043db75c13335ed))
* music progress bar ([b46cb0fa](https://github.com/Clarkkkk/Netease-Music-App/commit/b46cb0fa1f3e33a423880479b5fc76be8f67c0ec))
* support history playlist in store ([71598322](https://github.com/Clarkkkk/Netease-Music-App/commit/715983221f8220f92a1a2793e84b3e6606149e89))
* usePlaylistStore and other store relative updates ([7a5fb7d7](https://github.com/Clarkkkk/Netease-Music-App/commit/7a5fb7d72e1d6ec389c937131692f695dcf137b3))
* usePlayStatusEffect and useMusicControls ([7110c676](https://github.com/Clarkkkk/Netease-Music-App/commit/7110c676f89bf0fba613561fb92d79958d727c21))
* store login user id and expires ([fa55a495](https://github.com/Clarkkkk/Netease-Music-App/commit/fa55a49549b5a57369eb41b276d1ff8ffe1f1bff))
* Audio and useAudioStore ([39ab2652](https://github.com/Clarkkkk/Netease-Music-App/commit/39ab265216362a27e570b0b7a3fcf09ee28ed9c8))
* navigation guard ([28afcf7a](https://github.com/Clarkkkk/Netease-Music-App/commit/28afcf7a8d254a02362b4c1ed45b61d690674bb0))
* RouterLink in Nav ([60b3f022](https://github.com/Clarkkkk/Netease-Music-App/commit/60b3f0229673bd53c973db23be80db5d52b4141a))
* nav and login ([5e894ef1](https://github.com/Clarkkkk/Netease-Music-App/commit/5e894ef1c3885fc4165f2414cc8ba3a0db14fbea))
    
    ### **Description**
    
    - Nav, Profile, Button, LoginModal
    - update daisyui to v3
    - move an eslint rule
    - bug fixes
    - remove useless code
    
* useProfileStore and logout api in useAuthStore ([3f9465ef](https://github.com/Clarkkkk/Netease-Music-App/commit/3f9465ef1ce5a33ace2b2e3fb940bd05b0040592))
* global nav bar ([3bcf07ec](https://github.com/Clarkkkk/Netease-Music-App/commit/3bcf07ec21f47d8271d3e5b2a2f2f6f557f13722))
* log in feature and more ([21997a51](https://github.com/Clarkkkk/Netease-Music-App/commit/21997a51720b85ebc2742e4a84382c499ca3149d))
* generate api interface with scirpts ([ecc503f9](https://github.com/Clarkkkk/Netease-Music-App/commit/ecc503f9a4d416e229d156bd0a7303ed7345fe8a))
* write some config files ([300bd1b5](https://github.com/Clarkkkk/Netease-Music-App/commit/300bd1b56d069b82ece7ecab19c8017da1dcfba3))
* Rewrite the whole program with vue 3, vite, TypeScript, pnpm, etc. ([1da0cb39](https://github.com/Clarkkkk/Netease-Music-App/commit/1da0cb39ebc968bf0333f3db8365bc778b134ede))

## **Bug Fixes**

* update pnpm version in build.yml ([4650b682](https://github.com/Clarkkkk/Netease-Music-App/commit/4650b6821e37d2ca0c0db0711b129298aacedaab))
* should show subName when it is 'null' ([0f0dc37f](https://github.com/Clarkkkk/Netease-Music-App/commit/0f0dc37fbca68522c8db56eb6b9c8c7fa53e52f8))
* fix a bug in switchToThisSong ([9ed9e6b7](https://github.com/Clarkkkk/Netease-Music-App/commit/9ed9e6b712be251fc6cda1de3e5e8b475423b3b9))
* not using async function in personal fm button ([549c75e3](https://github.com/Clarkkkk/Netease-Music-App/commit/549c75e33b0a7bd9f0f42065b1db26d9ee65f7a3))
* button icons overlap when loading ([d083bb05](https://github.com/Clarkkkk/Netease-Music-App/commit/d083bb05877b7787129e93da0a9ca516916c79f7))
* convert banner picture url to https ([3884d4d0](https://github.com/Clarkkkk/Netease-Music-App/commit/3884d4d07efd009c537ff07496201a54de81d9c7))
* timestamp not updated after url update ([7695ee5b](https://github.com/Clarkkkk/Netease-Music-App/commit/7695ee5bcaf19963212935d31ce0f569e3e7ce96))
* wrong condition in song url expiration checking ([cd762c69](https://github.com/Clarkkkk/Netease-Music-App/commit/cd762c69e4d9c0ee7e1793a4f3b50ec09dfa0497))
* vite "base" option should start with a slash ([7739a463](https://github.com/Clarkkkk/Netease-Music-App/commit/7739a4637b89c0aaf1cd3c0f3b39600908bb5d10))
* use node 16 to comply with @squoosh/lib ([55fdf5c0](https://github.com/Clarkkkk/Netease-Music-App/commit/55fdf5c0e177976e9c77eb60d6c263a701af8710))
* refetch song url when it expires ([03bdbd63](https://github.com/Clarkkkk/Netease-Music-App/commit/03bdbd63f221d0e840e89fbd64354d7eb411768e))
* fix a bug in storeLoginInfo and ensure the song url to be https ([6edcbbd4](https://github.com/Clarkkkk/Netease-Music-App/commit/6edcbbd4bd1b08e50b04be3c53bf3913ba9bd38c))
* change expire calculation ([6232d8f9](https://github.com/Clarkkkk/Netease-Music-App/commit/6232d8f9af8d9acf8a21a5ca64c4fc961941258b))
* change the default bit rate to 320k ([f3c24394](https://github.com/Clarkkkk/Netease-Music-App/commit/f3c243943ca6ced148eb119305a763a1e7e8342c))
* urls of pictures are not https ([bd69c3e4](https://github.com/Clarkkkk/Netease-Music-App/commit/bd69c3e44730815ab0a3ac4713b148914134b619))
* fix base path ([0437367c](https://github.com/Clarkkkk/Netease-Music-App/commit/0437367ccb79ad18d713c3a0346eb79af47b43d7))
* fix play relavent problems ([9af1b53d](https://github.com/Clarkkkk/Netease-Music-App/commit/9af1b53d91e005a854b1f86c7e607342b41f8153))
* before playing current song,should wait until ready ([a09cab6d](https://github.com/Clarkkkk/Netease-Music-App/commit/a09cab6d8336b21059de68081fe1ccdbfe8256c8))
* fix a bug that Image does not update when src changes ([04f558bb](https://github.com/Clarkkkk/Netease-Music-App/commit/04f558bb53f81aa4535b87ecf1cb2400a7c816ba))
* fix audio status event problems ([24a3ddeb](https://github.com/Clarkkkk/Netease-Music-App/commit/24a3ddeb44843f87a4e6f4058eaed5614afe25fa))
* fix login problems when login expires ([0ce700ed](https://github.com/Clarkkkk/Netease-Music-App/commit/0ce700ed97fd1e727a9c32baa0c94ab0235befa2))
* reload after login ([07f28259](https://github.com/Clarkkkk/Netease-Music-App/commit/07f28259cbbe54c54e700eab8115aa93924489cf))

## **Chores**

* changelog ([af01324f](https://github.com/Clarkkkk/Netease-Music-App/commit/af01324fd5cae4e4822543da98fc5f539781ff2c))
* set vite clearScreen to false ([cc8dd6da](https://github.com/Clarkkkk/Netease-Music-App/commit/cc8dd6da12934ea31dac7f9c7b1ad78fa56ac9bd))
* rename radio page to playing page and fix some problems ([6c0f1c2d](https://github.com/Clarkkkk/Netease-Music-App/commit/6c0f1c2db61359ff515224353ab4135c2e72072d))
* add container query tailwindcss plugin ([55cbbd80](https://github.com/Clarkkkk/Netease-Music-App/commit/55cbbd80c6bc1a5780092972f6a71ecef6321a17))
* tailwind custom variables ([341a9308](https://github.com/Clarkkkk/Netease-Music-App/commit/341a93087fc2d9aaa64f3a324b07e0e4345c60e4))
* eslint config ([64834721](https://github.com/Clarkkkk/Netease-Music-App/commit/648347212ab14d9c0eb376a12107c97a35fc32e8))
* use pnpm and setup cache in github actions ([77a3ce9d](https://github.com/Clarkkkk/Netease-Music-App/commit/77a3ce9ddbefc97b7745720cbe9459389e5c5945))
* update website meta and favicon ([10b8d33d](https://github.com/Clarkkkk/Netease-Music-App/commit/10b8d33de5550b2a0ed7e582bbf87982c15a81df))
* configure __VUE_OPTIONS_API__ and fix build problems ([5cfc38b1](https://github.com/Clarkkkk/Netease-Music-App/commit/5cfc38b1cfb87ea2334136d1121070f75c5a000c))
* add a prop to eliminate vue alert ([46e16887](https://github.com/Clarkkkk/Netease-Music-App/commit/46e16887d340f6229de4cc842bf6d88078598757))
* format file ([08b03939](https://github.com/Clarkkkk/Netease-Music-App/commit/08b03939e92d78110bc8be54ceb3a86b78078566))
* song api and types ([d122e665](https://github.com/Clarkkkk/Netease-Music-App/commit/d122e6654a1c9883332f2200181e862ef8727f82))
* lint config ([e7f01639](https://github.com/Clarkkkk/Netease-Music-App/commit/e7f01639fd4bfd4932c7e78f9ceac73b226f9682))
* format all the code in one go ([587d6f87](https://github.com/Clarkkkk/Netease-Music-App/commit/587d6f8734e4cf3691d2602acf6dabdaa30d8a9f))
* adjust unplugin-vue-components, turn on type checker ([36fe3601](https://github.com/Clarkkkk/Netease-Music-App/commit/36fe36012cf7f51043658bf8b9fa9cb8538c2097))
* replace prettier-eslint with eslint-plugin-prettier ([c1565bad](https://github.com/Clarkkkk/Netease-Music-App/commit/c1565bad43597cbeac9b61a9ec470e783c914f87))
* config and deps ([af829bbc](https://github.com/Clarkkkk/Netease-Music-App/commit/af829bbc6ffd3491ea179148cd1e9a537649c30c))
* fix ApiLoginStatus and complete ApiUserDetail ([95eae104](https://github.com/Clarkkkk/Netease-Music-App/commit/95eae104f0d4c9e3bf743980a05b9f49ab825ca0))
* tailwind config ([36725382](https://github.com/Clarkkkk/Netease-Music-App/commit/367253822a44a418641959f9500b8e0e40252646))
* eslint config ([4e9b1798](https://github.com/Clarkkkk/Netease-Music-App/commit/4e9b1798717be6483cfbe9e991c654d5bc646d8e))
* move components.d.ts to src/types ([14a5661e](https://github.com/Clarkkkk/Netease-Music-App/commit/14a5661e0414d27d9a9b16d402ce24753bb49fbd))
* format files in pre-commit ([5ab40273](https://github.com/Clarkkkk/Netease-Music-App/commit/5ab40273b2a8d989d47229848a5d99ff043c4d3d))
* typescript config, deps update etc ([374b7e1f](https://github.com/Clarkkkk/Netease-Music-App/commit/374b7e1f42f633854378561f4f2318dc22961fc9))
