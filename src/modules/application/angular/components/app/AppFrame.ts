export class AppFrame implements ng.IComponentOptions {
    public template: string = `
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#/">SailCom</a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li><a href="#/session" title="Ships">Session</a></li>
                        <li><a href="#/trips" title="Trips">Trips</a></li>
                        <li><a href="#/" title="Ships">Ships</a></li>
                        <li><a href="#/about" title="About">About</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <div ng-view></div>`;
}
