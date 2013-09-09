SlightlyLax.js
==============

Create content sections that slide over each other as the user scrolls. It's a little like parallax, but only slightly.

##Setup

Include the script

```HTML
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/SlightlyLax.js"></script>
```

Your page sctructure should look something like this:

```HTML
	<div class="lax-wrap">
		<div class="panel">
			<!-- content -->
		</div>
		<div class="panel" data-lax="true">
			<!-- content -->
		</div>
		<div class="panel" data-lax="true">
			<!-- content -->
		</div>
		<div class="panel" data-lax="true">
			<!-- content -->
		</div>
	</div>
```

Ideally in your stylesheets make sure your ".panel" class has a set height. SlightlyLax will find panels where "data-lax" is set to true. As the user scrolls, these panels will slide up over the previous panel slightly hiding that content. The first panel doesn't need the "data-lax" attribute.
